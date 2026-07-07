import * as React from "react";
import { Text as RNText } from "react-native";
import { cn } from "~/lib/cn";

interface TextProps extends React.ComponentPropsWithoutRef<typeof RNText> {
  className?: string;
}

const Text = React.forwardRef<RNText, TextProps>(
  ({ className, ...props }, ref) => (
    <RNText
      ref={ref}
      className={cn("text-neutral-900 dark:text-neutral-50", className)}
      {...props}
    />
  )
);

Text.displayName = "Text";

export { Text };
