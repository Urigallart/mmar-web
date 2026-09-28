import { ElementType } from "react";
import clsx from "clsx";

export function Container({
  children,
  className,
  as: Tag = "div",
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
  wide?: boolean;
}) {
  const Component = Tag as ElementType;
  return (
    <Component className={clsx("container-page", wide && "container-page--wide", className)}>
      {children}
    </Component>
  );
}
