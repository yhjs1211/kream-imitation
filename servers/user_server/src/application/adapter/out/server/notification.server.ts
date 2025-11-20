import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ServerOutPort, ServerResponse } from '../../../port/out-port/server/interface/common.js';

@Injectable()
export class NotificationServer extends ServerOutPort {
  private readonly NOTIFICATION_SERVER = process.env.NOTIFICATION_URL!;

  constructor(private readonly httpService: HttpService) {
    super();
  }

  protected encodeUrl(url: string): string {
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
    return await this.httpService.axiosRef.get(`${this.NOTIFICATION_SERVER}${this.encodeUrl(url)}`);
  }

  protected async POST<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.post(`${this.NOTIFICATION_SERVER}${this.encodeUrl(url)}`, body);
  }

  protected async PUT<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.put(`${this.NOTIFICATION_SERVER}${this.encodeUrl(url)}`, body);
  }

  protected async PATCH<R>(url: string, body: any): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.patch(`${this.NOTIFICATION_SERVER}${this.encodeUrl(url)}`, body);
  }

  protected async DELETE<R>(url: string): Promise<AxiosResponse<ServerResponse<R>>> {
    return await this.httpService.axiosRef.delete(`${this.NOTIFICATION_SERVER}${this.encodeUrl(url)}`);
  }
}

export const SYMBOL_NOTIFICATION_SERVER = Symbol.for('NotificationServer');
