import * as React from "react";
import { View } from "react-native";
import { cn } from "~/lib/cn";
import { Input } from "./ui/input";
import { Text } from "./ui/text";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  resultCount?: number;
  className?: string;
}

function SearchBar({ value, onChangeText, resultCount, className }: SearchBarProps) {
  return (
    <View className={cn("gap-2", className)}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Search photos..."
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
        accessibilityLabel="Search photos"
        accessibilityHint="Type to filter photos by title"
      />
      {value.trim().length > 0 && resultCount !== undefined && (
        <Text className="text-xs text-neutral-500 dark:text-neutral-400 pl-1">
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </Text>
      )}
    </View>
  );
}

export { SearchBar };
