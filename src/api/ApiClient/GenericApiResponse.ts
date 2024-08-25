interface GenericSuccessResponse<T = object> {
  status: number;
  isSuccess: true;
  isNetworkError: false;
  body: T;
}

interface FailedResponse<T = object> {
  status: number;
  isSuccess: false;
  isNetworkError: false;
  body: T;
}

interface NetworkErrorResponse {
  status: null;
  isSuccess: false;
  isNetworkError: true;
  body: null;
}

export type GenericApiResponse<S = object, F = object> =
  | GenericSuccessResponse<S>
  | FailedResponse<F>
  | NetworkErrorResponse;
