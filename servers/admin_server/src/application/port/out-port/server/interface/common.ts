import type { AxiosResponse } from 'axios';

export interface ServerResponse<R> {
  code: number;
  message: string;
  data: R;
}

export abstract class ServerOutPort {
  protected abstract encodeUrl(url: string): string;
  protected abstract GET<R>(url: string): Promise<AxiosResponse<ServerResponse<R>>>;
  protected abstract POST<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>>;
  protected abstract PUT<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>>;
  protected abstract PATCH<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>>;
  protected abstract DELETE<R>(url: string): Promise<AxiosResponse<ServerResponse<R>>>;
}
