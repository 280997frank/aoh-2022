import type { ReactNode } from "react";
export interface IContentDetail {
  title?: string;
  color?: string;
  children: ReactNode;
  isUppercase?: boolean;
}
