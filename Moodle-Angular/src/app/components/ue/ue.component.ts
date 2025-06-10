import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent {
  @Input() ue: any;
}
