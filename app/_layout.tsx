import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFrameworkReady } from "~/hooks/useFrameworkReady";
import { queryClient } from "~/lib/queryClient";

export default function RootLayout() {
  useFrameworkReady();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
          headerTintColor: "#2563eb",
          contentStyle: {
            backgroundColor: "#fafafa",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Photo Gallery",
          }}
        />
        <Stack.Screen
          name="photo/[id]"
          options={{
            title: "Photo Detail",
            headerBackTitle: "Gallery",
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </QueryClientProvider>
  );
}
