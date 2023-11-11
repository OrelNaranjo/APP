import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-type',
  templateUrl: './pokemon-type.component.html',
  styleUrls: ['./pokemon-type.component.scss'],
})
export class PokemonTypeComponent  implements OnInit {

  @Input() type!: string;

  constructor() { }

  ngOnInit() {}

  getTypeColor(type: string): string {
    switch (type) {
      case 'Acero':
        return '#A8A8C0';
      case 'Agua':
        return '#3899F8';
      case 'Bicho':
        return '#A8B820';
      case 'Dragón':
        return '#7860E0';
      case 'Eléctrico':
        return '#F8D030';
      case 'Fantasma':
        return '#6060B0';
      case 'Fuego':
        return '#F05030';
      case 'Hada':
        return '#E79FE7';
      case 'Hielo':
        return '#58C8E0';
      case 'Lucha':
        return '#A05038';
      case 'Normal':
        return '#A8A090';
      case 'Planta':
        return '#78C850';
      case 'Psíquico':
        return '#F870A0';
      case 'Roca':
        return '#B8A058';
      case 'Siniestro':
        return '#7A5848';
      case 'Tierra':
        return '#E9D6A4';
      case 'Veneno':
        return '#B058A0';
      case 'Volador':
        return '#98A8F0';
      default:
        return 'gray';
    }
  }

}
