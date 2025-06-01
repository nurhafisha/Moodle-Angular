import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent{
  @Input() cours: any[] = [];
  @Input() ressources: any[] = [];
  @Input() devoirs: any[] = [];
  @Input() forums: any[] = [];
}