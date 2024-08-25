
export interface RequestOptions {
  parseResponseAs?: "json" | "text" | "blob";
  headers?: { [k: string]: string };
}
