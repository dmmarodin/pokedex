export interface PokemonListItem {
    id: number;
    name: string;
    image: string;
}

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    images: {
        front: string;
        back: string;
        shinyFront: string;
        shinyBack: string;
    };
    types: string[];
    stats: Stat[],
    abilities: Ability[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface Ability {
    name: string;
}