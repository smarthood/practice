import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttproutingService {
  constructor(private router: Router) {}
}
