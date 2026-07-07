import * as React from "react";
import { Pressable, View } from "react-native";
import { cn } from "~/lib/cn";
import { Text } from "./text";

type BadgeVariant = "default" | "outline" | "active";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  onPress?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600",
  outline:
    "bg-transparent border border-neutral-300 dark:border-neutral-600",
  active:
    "bg-primary-500 dark:bg-primary-600 border border-primary-500 dark:border-primary-600",
};

const textVariantStyles: Record<BadgeVariant, string> = {
  default: "text-neutral-700 dark:text-neutral-200",
  outline: "text-neutral-600 dark:text-neutral-300",
  active: "text-white",
};

function Badge({ label, variant = "default", onPress, className }: BadgeProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      className={cn(
        "rounded-full px-3 py-1.5 flex-row items-center",
        variantStyles[variant],
        className
      )}
    >
      <Text className={cn("text-xs font-semibold", textVariantStyles[variant])}>
        {label}
      </Text>
    </Container>
  );
}

export { Badge };
