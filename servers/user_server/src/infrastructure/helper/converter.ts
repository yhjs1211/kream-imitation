import { Injectable } from '@nestjs/common';

@Injectable()
export class Converter {
  encodeString(string: string) {
    return encodeURIComponent(string);
  }

  decodeString(string: string) {
    return decodeURIComponent(string);
  }

  // xss 특수문자 변환
  convertSpecialCharacter(string: string) {
    return string
      .replace(/(&lt;)/g, '<')
      .replace(/(&gt;)/g, '>')
      .replace(/(&quot;)/g, '"')
      .replace(/(&apos;)/g, "'")
      .replace(/(&nbsp;)/g, ' ')
      .replace(/(&#40;)/g, '(')
      .replace(/(&#41;)/g, ')')
      .replace(/(&#35;)/g, '#')
      .replace(/(&amp;)/g, '&');
  }

  // xss 공격용 특수문자 치환
  replaceSpecialCharacters(string: string) {
    return string
      .replace(/&/g, '&amp;')
      .replace(/#/g, '&#35;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/ /g, '&nbsp;')
      .replace(/\(/g, '&#40;')
      .replace(/\)/g, '&#41;')
      .replace(
        /(javascript)|(eval)|(document)|(onload)|(alert)|(onclick)|(onkeydown)/g,
        '', // 화이트 리스트로 변경
      );
  }
}

export const SYMBOL_CONVERTER = Symbol('CONVERTER');
