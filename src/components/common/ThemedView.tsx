import React from "react";
import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
  children?: React.ReactNode;
  edges?: boolean;
}

const ThemedView = ({ className, children }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}
      className={className}
      //   edges={{ top: "off" }}
    >
      {children}
    </View>
  );
};

export default ThemedView;
