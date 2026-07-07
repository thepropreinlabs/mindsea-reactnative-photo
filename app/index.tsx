import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  useWindowDimensions,
  View,
} from "react-native";
import { AlbumFilter } from "~/components/AlbumFilter";
import { PhotoCard } from "~/components/PhotoCard";
import { PhotoCardSkeleton } from "~/components/PhotoCardSkeleton";
import { SearchBar } from "~/components/SearchBar";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useInfinitePhotos } from "~/hooks/usePhotos";
import { useDebounce } from "~/hooks/useDebounce";
import type { Photo } from "~/types/photo";

const COLUMN_GAP = 12;
const HORIZONTAL_PADDING = 16;

function getColumnCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
}

export default function GalleryScreen() {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = React.useState("");
  const [selectedAlbumId, setSelectedAlbumId] = React.useState<number | null>(null);

  const debouncedSearch = useDebounce(searchText, 400);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePhotos({ search: debouncedSearch, albumId: selectedAlbumId });

  const photos = React.useMemo(
    () => data?.pages.flatMap((page) => page.photos) ?? [],
    [data]
  );

  const totalCount = data?.pages[0]?.totalCount;
  const numColumns = getColumnCount(width);

  function handleEndReached() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  function renderItem({ item, index }: { item: Photo; index: number }) {
    const isLastInRow = (index + 1) % numColumns === 0;
    return (
      <PhotoCard
        photo={item}
        className={isLastInRow ? "" : "mr-3"}
      />
    );
  }

  function renderFooter() {
    if (!isFetchingNextPage) return <View className="h-6" />;
    return (
      <View className="py-6 items-center">
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
        <View className="px-4 pt-4 pb-3 gap-3">
          <View className="h-11 rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
          <View className="h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse w-3/4" />
        </View>
        <View className="flex-1 px-4">
          <FlatList
            data={Array.from({ length: 6 })}
            keyExtractor={(_, i) => String(i)}
            numColumns={numColumns}
            key={numColumns}
            columnWrapperStyle={numColumns > 1 ? { gap: COLUMN_GAP } : undefined}
            contentContainerStyle={{ gap: COLUMN_GAP }}
            renderItem={() => <PhotoCardSkeleton />}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center px-8 gap-4 bg-neutral-50 dark:bg-neutral-950">
        <Text className="text-4xl">!</Text>
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-50 text-center">
          Failed to load photos
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          {error instanceof Error ? error.message : "An unexpected error occurred."}
        </Text>
        <Button label="Try Again" onPress={() => refetch()} className="mt-2" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
      <FlatList
        data={photos}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        key={numColumns}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.4}
        columnWrapperStyle={numColumns > 1 ? { gap: COLUMN_GAP } : undefined}
        contentContainerStyle={{
          paddingHorizontal: HORIZONTAL_PADDING,
          paddingBottom: 24,
          gap: COLUMN_GAP,
        }}
        ListHeaderComponent={
          <View className="gap-3 pt-4 pb-3">
            <SearchBar
              value={searchText}
              onChangeText={setSearchText}
              resultCount={photos.length}
            />
            <AlbumFilter
              selectedAlbumId={selectedAlbumId}
              onSelectAlbum={setSelectedAlbumId}
            />
            {totalCount !== undefined && (
              <Text className="text-xs text-neutral-400 dark:text-neutral-500 pl-1">
                Showing {photos.length} of {totalCount} photos
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          <View className="items-center justify-center py-20 gap-3">
            <Text className="text-5xl">&#x1F50D;</Text>
            <Text className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
              No photos found
            </Text>
            <Text className="text-sm text-neutral-400 dark:text-neutral-500 text-center px-8">
              Try adjusting your search or clearing the album filter.
            </Text>
          </View>
        }
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        showsVerticalScrollIndicator={Platform.OS === "web"}
      />
    </View>
  );
}
