import type { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import type { AxiosResponse } from 'axios';
import { ServerOutPort, type ServerResponse } from '../../../port/out-port/server/interface/common';

@Injectable()
export class ProductServer extends ServerOutPort {
  private readonly PRODUCT_SERVER = process.env.PRODUCT_SERVICE_URL!;
  constructor(private readonly httpService: HttpService) {
    super();
  }

  protected encodeUrl(url: string) {
    return url.replace(/[+#:]/g, (match) => {
      switch (match) {
        case '+':
          return '%2B';
        case '#':
          return '%23';
        case ':':
          return '%3A';
        default:
          return match;
      }
    });
  }

  protected async GET<R>(url: string): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.get(`${this.PRODUCT_SERVER}/service${this.encodeUrl(url)}`);
  }

  protected async POST<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.post(`${this.PRODUCT_SERVER}/service${this.encodeUrl(url)}`, body);
  }

  protected async PUT<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.put(`${this.PRODUCT_SERVER}/service${this.encodeUrl(url)}`, body);
  }

  protected async PATCH<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.patch(`${this.PRODUCT_SERVER}/service${this.encodeUrl(url)}`, body);
  }

  protected async DELETE<R>(url: string): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.delete(`${this.PRODUCT_SERVER}/service${this.encodeUrl(url)}`);
  }
}

export const SYMBOL_PRODUCT_SERVER = Symbol('PRODUCT_SERVER');
