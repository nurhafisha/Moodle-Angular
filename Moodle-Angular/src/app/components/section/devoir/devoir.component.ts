import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent{
  @Input() devoirs: any[] = [];
}
