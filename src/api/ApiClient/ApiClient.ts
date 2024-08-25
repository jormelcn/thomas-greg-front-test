import { ApiConfig } from "./ApiConfig";
import { GenericApiResponse } from "./GenericApiResponse";
import { GenericRequest } from "./GenericRequest";

export default class ApiClient {
  constructor(private readonly config: ApiConfig) {}

  public haveAuthorization(): boolean {
    return (
      this.config.authProvider != null && this.config.authProvider() != null
    );
  }

  public formatApiPath(path: string): string {
    const baseUrl =
      this.config.baseUrl.startsWith("http://") ||
      this.config.baseUrl.startsWith("https://")
        ? this.config.baseUrl.endsWith("/")
          ? this.config.baseUrl
          : this.config.baseUrl + "/"
        : new URL(this.config.baseUrl, document.location.origin).toString() +
          "/";
    const urlObj = new URL(path, baseUrl);
    if (this.config.includeQuery) {
      for (const key in this.config.includeQuery) {
        urlObj.searchParams.append(key, this.config.includeQuery[key]);
      }
    }
    return urlObj.toString();
  }

  public async request<S = object>({
    route,
    method,
    body,
    authorization,
    contentType,
    headers,
    parseResponseAs,
  }: GenericRequest<object>): Promise<GenericApiResponse<S>> {
    method = method ?? "GET";
    contentType =
      contentType ??
      (body instanceof FormData ? undefined : "application/json");
    headers = headers ?? {};
    authorization =
      authorization ?? (this.config.authProvider && this.config.authProvider());

    if (authorization) headers["Authorization"] = authorization;
    if (this.config.apiKey) headers["ApiKeySecret"] = this.config.apiKey;
    if ((method == "POST" || method == "PUT") && contentType)
      headers["Content-Type"] = contentType;
    const url = this.formatApiPath(route);
    try {
      const response = await fetch(url, {
        method,
        headers,
        body:
          contentType === "application/json"
            ? JSON.stringify(body)
            : (body as BodyInit),
        credentials: this.config.credentials,
      });
      let responseBody;
      if (response.status === 204) {
        responseBody = null;
      } else if (parseResponseAs !== undefined) {
        responseBody = await response[parseResponseAs]();
      } else if (
        response.headers.get("Content-Type")?.startsWith("application/json")
      ) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }
      return {
        status: response.status,
        isSuccess: response.status >= 200 && response.status < 300,
        isNetworkError: false,
        body: responseBody,
      };
    } catch(error) {
      console.error(error)
      return {
        status: null,
        isSuccess: false,
        isNetworkError: true,
        body: null,
      };
    }
  }
}
