declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "*.png";

declare module "*.jpg";

declare module "*.jpeg";

declare module "*.svg" {
  import React from "react";

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __IS_DEV__: boolean;

const __brand: unique symbol;
declare type Brand<K, T> = K & { [__brand]: T };

declare type FormField<T> = {
  name: keyof T;
  label: string;
  type: "text" | "password";
};

/**
 * Type aliases
 */
declare type Phone = string;

declare type Email = string;

declare type Id = number;

declare type DateIso = string;

declare type Timestamp = number;

/**
 * Type utils
 */
declare type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
