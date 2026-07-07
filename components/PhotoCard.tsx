import { useRouter } from "expo-router";
import * as React from "react";
import { Image, Pressable } from "react-native";
import { getThumbnailUrl } from "~/lib/api";
import { cn } from "~/lib/cn";
import type { Photo } from "~/types/photo";
import { Card, CardContent } from "./ui/card";
import { Text } from "./ui/text";

interface PhotoCardProps {
  photo: Photo;
  className?: string;
}

function PhotoCard({ photo, className }: PhotoCardProps) {
  const router = useRouter();

  function handlePress() {
    router.push(`/photo/${photo.id}`);
  }

  return (
    <Pressable
      onPress={handlePress}
      className={cn("flex-1", className)}
      accessibilityRole="button"
      accessibilityLabel={`View photo: ${photo.title}`}
    >
      {({ pressed }) => (
        <Card className={cn("overflow-hidden", pressed && "opacity-80")}>
          <Image
            source={{ uri: getThumbnailUrl(photo.id) }}
            className="w-full aspect-square"
            resizeMode="cover"
            accessibilityLabel={photo.title}
          />
          <CardContent className="pt-3 pb-3">
            <Text
              className="text-sm font-medium text-neutral-900 dark:text-neutral-50 leading-5"
              numberOfLines={2}
            >
              {photo.title}
            </Text>
            <Text className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
              Album {photo.albumId}
            </Text>
          </CardContent>
        </Card>
      )}
    </Pressable>
  );
}

export { PhotoCard };
