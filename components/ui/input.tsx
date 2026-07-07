import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "~/lib/cn";

interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ className, ...props }, ref) => (
    <TextInput
      ref={ref}
      className={cn(
        "h-11 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800",
        "px-4 text-base text-neutral-900 dark:text-neutral-50",
        "placeholder:text-neutral-400 dark:placeholder:text-neutral-500",
        "web:focus:outline-none web:focus:ring-2 web:focus:ring-primary-500",
        className
      )}
      placeholderTextColor="#a3a3a3"
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
