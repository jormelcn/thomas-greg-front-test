import { RequestOptions } from "./RequestOptions";

type methodOptions = "GET" | "POST" | "PUT" | "DELETE";

export interface GenericRequest<B = object | FormData | string>
  extends RequestOptions {
  route: string;
  method?: methodOptions;
  body?: B;
  authorization?: string | null;
  contentType?: string;
  headers?: { [key: string]: string };
}
