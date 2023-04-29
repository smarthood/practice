import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss'],
})
export class SampleComponent {
  constructor(private router: Router) {}
  onOutput(e: any) {
    if (e) {
      this.router.navigate(['/detail', e]);
    }
  }
}
