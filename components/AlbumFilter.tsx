import * as React from "react";
import { ScrollView, View } from "react-native";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";

const ALBUM_IDS = Array.from({ length: 10 }, (_, i) => i + 1);

interface AlbumFilterProps {
  selectedAlbumId: number | null;
  onSelectAlbum: (albumId: number | null) => void;
}

function AlbumFilter({ selectedAlbumId, onSelectAlbum }: AlbumFilterProps) {
  return (
    <View className="gap-1.5">
      <Text className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider pl-1">
        Filter by Album
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-2 px-1"
        accessibilityRole="scrollbar"
        accessibilityLabel="Album filter"
      >
        <Badge
          label="All"
          variant={selectedAlbumId === null ? "active" : "default"}
          onPress={() => onSelectAlbum(null)}
        />
        {ALBUM_IDS.map((id) => (
          <Badge
            key={id}
            label={`Album ${id}`}
            variant={selectedAlbumId === id ? "active" : "default"}
            onPress={() => onSelectAlbum(selectedAlbumId === id ? null : id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export { AlbumFilter };
