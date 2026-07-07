import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { getFullImageUrl } from "~/lib/api";
import { usePhoto } from "~/hooks/usePhotos";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";

interface MetadataRowProps {
  label: string;
  value: string | number;
}

function MetadataRow({ label, value }: MetadataRowProps) {
  return (
    <View className="flex-row items-start justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 last:border-b-0">
      <Text className="text-sm font-medium text-neutral-500 dark:text-neutral-400 w-24">
        {label}
      </Text>
      <Text className="text-sm text-neutral-900 dark:text-neutral-50 flex-1 text-right">
        {String(value)}
      </Text>
    </View>
  );
}

export default function PhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const photoId = parseInt(id ?? "", 10);

  const { data: photo, isLoading, isError, error, refetch } = usePhoto(photoId);

  if (isNaN(photoId)) {
    return (
      <View className="flex-1 items-center justify-center px-8 gap-4 bg-neutral-50 dark:bg-neutral-950">
        <Text className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
          Invalid photo ID
        </Text>
        <Button label="Go Back" variant="outline" onPress={() => router.back()} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-neutral-50 dark:bg-neutral-950">
        <View className="w-full aspect-video bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        <View className="px-4 pt-6 gap-3">
          <View className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-4/5" />
          <View className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/5" />
          <View className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-2/5 mt-2" />
        </View>
      </View>
    );
  }

  if (isError || !photo) {
    return (
      <View className="flex-1 items-center justify-center px-8 gap-4 bg-neutral-50 dark:bg-neutral-950">
        <Text className="text-4xl">!</Text>
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-50 text-center">
          Photo not found
        </Text>
        <Text className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
          {error instanceof Error ? error.message : "Could not load this photo."}
        </Text>
        <View className="flex-row gap-3 mt-2">
          <Button label="Try Again" onPress={() => refetch()} />
          <Button label="Go Back" variant="outline" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-neutral-50 dark:bg-neutral-950"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{ uri: getFullImageUrl(photo.id) }}
        className="w-full"
        style={{ aspectRatio: 4 / 3 }}
        resizeMode="cover"
        accessibilityLabel={photo.title}
      />

      <View className="px-4 pt-5 gap-4">
        <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-50 leading-7 capitalize">
          {photo.title}
        </Text>

        <Card>
          <CardContent className="pt-4">
            <Text className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
              Details
            </Text>
            <MetadataRow label="Photo ID" value={photo.id} />
            <MetadataRow label="Album ID" value={photo.albumId} />
          </CardContent>
        </Card>

        <Button
          label="Back to Gallery"
          variant="outline"
          onPress={() => router.back()}
          className="mt-2"
        />
      </View>
    </ScrollView>
  );
}
