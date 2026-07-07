import * as React from "react";
import { View } from "react-native";
import { Card } from "./ui/card";

function PhotoCardSkeleton() {
  return (
    <View className="flex-1">
      <Card className="overflow-hidden">
        <View className="w-full aspect-square bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        <View className="px-4 pt-3 pb-3 gap-2">
          <View className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-4/5" />
          <View className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/5" />
          <View className="h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse w-1/4 mt-1" />
        </View>
      </Card>
    </View>
  );
}

export { PhotoCardSkeleton };
