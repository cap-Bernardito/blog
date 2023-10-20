import React from "react";
import SkeletonLib, {
  type SkeletonProps as SkeletonOnlyProps,
  type SkeletonStyleProps,
  SkeletonTheme,
  type SkeletonThemeProps,
} from "react-loading-skeleton";

import "./skeleton.scss";

type SkeletonProps = SkeletonOnlyProps & SkeletonThemeProps;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const { count, wrapper, className, containerClassName, containerTestId, circle, style, ...commonProps } = props;

  const sceletonOnlyProps = { count, wrapper, className, containerClassName, containerTestId, circle, style };

  const defaultProps: SkeletonStyleProps = {
    baseColor: "var(--skeleton-base-color)",
    highlightColor: "var(--skeleton-highlight-color)",
  };

  return (
    <SkeletonTheme {...defaultProps} {...commonProps}>
      <SkeletonLib {...sceletonOnlyProps} />
    </SkeletonTheme>
  );
};
