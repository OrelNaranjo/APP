import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonDetailsPageRoutingModule } from './pokemon-details-routing.module';

import { PokemonDetailsPage } from './pokemon-details.page';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from 'src/app/services/pokemon.service';
import { SharedModule } from 'src/app/components/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonDetailsPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [PokemonDetailsPage],
  providers: [PokemonService]
})
export class PokemonDetailsPageModule {}
