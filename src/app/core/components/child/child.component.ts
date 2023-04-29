import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss'],
})
export class ChildComponent {
  text!: string;
  @Input() names!: string;
  @Output() eventName = new EventEmitter<any>();
  onClick() {
    this.eventName.emit(this.text);
  }
  onText(e: any) {
    this.text = e.target.value;
  }
}
