import { Component, input } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { PokemonListItem } from '../../models/pokemon.model';
import { RouterLink } from '@angular/router';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CardComponent, RouterLink, CapitalizePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  pokemon = input.required<PokemonListItem>()
}
