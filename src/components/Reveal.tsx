import { ElementType } from "react";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  start?: string;
};

export function Reveal({ children, as: Tag = "div", className }: RevealProps) {
  const Component = Tag as ElementType;
  return <Component className={className}>{children}</Component>;
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  itemSelector?: string;
  stagger?: number;
  y?: number;
  start?: string;
};

export function RevealGroup({ children, className }: RevealGroupProps) {
  return <div className={className}>{children}</div>;
}
