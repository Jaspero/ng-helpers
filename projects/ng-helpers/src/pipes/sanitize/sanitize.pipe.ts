import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

/**
 * Applies the appropriate DomSanitizer method
 * to inputted value.
 *
 * @example
 * <div [innerHtml]="someHtmlValue | sanitize"></div>
 */
@Pipe({
  name: 'jpSanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(
    private _sanitizer: DomSanitizer
  ) {}

  transform(value: string, type = 'html') {

    const sanitizeMap = {
      html: 'bypassSecurityTrustHtml',
      style: 'bypassSecurityTrustStyle',
      script: 'bypassSecurityTrustScript',
      url: 'bypassSecurityTrustUrl',
      resourceUrl: 'bypassSecurityTrustResourceUrl'
    };

    return this._sanitizer[sanitizeMap[type]](value);
  }
}
