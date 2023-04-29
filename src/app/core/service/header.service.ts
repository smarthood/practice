import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {}
  headers: { [url: string]: { [key: string]: string } } = {};

  public setheader(url: string, key: string, value: string) {
    if (this.headers && this.headers.hasOwnProperty(url)) {
      this.headers[url][key] = value;
      console.log('setHeaders :', this.headers);
    } else {
      this.headers[url] = { [key]: value };
      console.log('setHeaders else ', this.headers);
    }
  }
  public clearHeaders(url: string, key: string) {
    if (
      this.headers &&
      this.headers.hasOwnProperty(url) &&
      this.headers[url].hasOwnProperty(key)
    ) {
      const val = this.headers[url][key];
      delete this.headers[url][key];
      return val;
    }
    return;
  }
  public getHeaders(url: string) {
    if (this.headers && this.headers.hasOwnProperty(url)) {
      console.log('getHeaders If :', this.headers[url]);
      return this.headers[url];
    } else {
      console.log('getHeaders else :', this.headers['default']);
      return this.headers['default'];
    }
  }
}
