import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypeComponent } from './pokemon-type/pokemon-type.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [PokemonTypeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [PokemonTypeComponent]

})
export class SharedModule { }
