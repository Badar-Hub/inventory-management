export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "purge"
  | "PURGE"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export type ResponseType = "arraybuffer" | "blob" | "document" | "json" | "text" | "stream";

export type CustomAxiosConfig = {
  url?: string;
  method?: Method;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
};

export default interface IApiService {
  get<T>(resource: string, config?: CustomAxiosConfig | undefined): Promise<T>;

  post<T>(resource: string, data: any, config?: CustomAxiosConfig | undefined): Promise<T>;

  put<T>(resource: string, data: any, config?: CustomAxiosConfig | undefined): Promise<T>;

  delete<T>(resource: string): Promise<T>;
  addInterceptor(interceptor: (request: CustomAxiosConfig) => CustomAxiosConfig): void;
}
