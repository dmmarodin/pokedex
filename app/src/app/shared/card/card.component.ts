import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() additionalClasses = '';
}
