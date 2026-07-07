import * as React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { cn } from "~/lib/cn";
import { Text } from "./text";

type ButtonVariant = "default" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
  labelClassName?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-primary-500 active:bg-primary-600",
  outline:
    "bg-transparent border border-primary-500 active:bg-primary-50 dark:active:bg-primary-950",
  ghost: "bg-transparent active:bg-neutral-100 dark:active:bg-neutral-800",
  destructive: "bg-red-500 active:bg-red-600",
};

const labelVariantStyles: Record<ButtonVariant, string> = {
  default: "text-white",
  outline: "text-primary-600 dark:text-primary-400",
  ghost: "text-neutral-700 dark:text-neutral-200",
  destructive: "text-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 rounded-lg",
  md: "px-4 py-2.5 rounded-xl",
  lg: "px-6 py-3.5 rounded-xl",
};

const labelSizeStyles: Record<ButtonSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-base",
};

function Button({
  label,
  variant = "default",
  size = "md",
  loading = false,
  disabled,
  className,
  labelClassName,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center justify-center",
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && "opacity-50",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "default" || variant === "destructive" ? "#fff" : "#3b82f6"}
          className="mr-2"
        />
      )}
      <Text
        className={cn(
          "font-semibold",
          labelVariantStyles[variant],
          labelSizeStyles[size],
          labelClassName
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export { Button };
