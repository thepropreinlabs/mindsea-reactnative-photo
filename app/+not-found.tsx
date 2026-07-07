import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center bg-neutral-50 dark:bg-neutral-950 gap-4 p-8">
        <Text className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
          Page Not Found
        </Text>
        <Link href="/" className="text-primary-600 dark:text-primary-400 text-base">
          Go back to gallery
        </Link>
      </View>
    </>
  );
}
