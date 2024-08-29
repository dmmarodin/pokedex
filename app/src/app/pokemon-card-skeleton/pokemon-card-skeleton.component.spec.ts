import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardSkeletonComponent } from './pokemon-card-skeleton.component';

describe('PokemonCardSkeletonComponent', () => {
  let component: PokemonCardSkeletonComponent;
  let fixture: ComponentFixture<PokemonCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokemonCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
