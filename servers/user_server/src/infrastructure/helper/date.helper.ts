import { Injectable } from '@nestjs/common';

@Injectable()
export class DateHelper {
  getNowAsKST(): Date {
    const now = new Date(Date.now());

    now.setHours(now.getHours() + 9);

    return now;
  }

  /**
   * @description "0000년 00월 00일" 문자열 반환
   */
  getKorDateString(date?: Date | string) {
    let year: number;
    let month: number;
    let day: number;

    if (date) {
      if (typeof date === 'string') {
        const splitedDate = date.split('-');

        year = parseInt(splitedDate[0]);
        month = parseInt(splitedDate[1]);
        day = parseInt(splitedDate[2]);
      }

      if (date instanceof Date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
      }
    }

    const now = this.getNowAsKST();

    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();

    return `${year}년 ${month < 10 ? '0' + month : month}월 ${day < 10 ? '0' + day : day}일`;
  }
}

export const SYMBOL_DATE_HELPER = Symbol('DATE_HELPER');
