import { Component } from '@angular/core';

// pokemon-card-skeleton.component.ts
@Component({
  selector: 'app-pokemon-card-skeleton',
  standalone: true,
  template: `
    <div class="pokemon-card-skeleton">
      <div class="skeleton-image"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
    </div>
  `,
  styleUrls: ['./pokemon-card-skeleton.component.scss']
})
export class PokemonCardSkeletonComponent {

}