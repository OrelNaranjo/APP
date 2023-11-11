import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, tap, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon';
  page: number = 1;
  nextUrl: string | null = null;
  prevUrl: string | null = null;

  constructor(private http: HttpClient, private loadingService: LoadingService) { }

  getPokemons(url: string = `${this.url}?limit=8`): Observable<any> {
    this.loadingService.isLoading.next(true);
    return this.http.get<any>(url).pipe(
      tap((res: any) => {
        this.nextUrl = res.next;
        this.prevUrl = res.previous;
      }),
      switchMap((res: any) => {
        let detailsObservables = res.results.map((pokemon: any) => {
          return this.http.get<any>(pokemon.url);
        });

        return forkJoin(detailsObservables as any[]).pipe(
          map((details: any[]) => {
            return details.map((detail: any, index: number) => {
              let typesObservables = detail.types.map((type: any) => {
                return this.http.get<any>(`https://pokeapi.co/api/v2/type/${type.type.name}`);
              });

              return forkJoin(typesObservables as any[]).pipe(
                map((types: any[]) => {
                  const urlParts = res.results[index].url.split('/');
                  const id = urlParts[urlParts.length - 2];
                  return {
                    id: id,
                    name: res.results[index].name,
                    sprite: detail.sprites.other.dream_world.front_default,
                    types: types.map((type: any) => type.names.find((name: any) => name.language.name === 'es').name)
                  };
                })
              );
            });
          }),
          switchMap(res => forkJoin(res as any[])),
          finalize(() => this.loadingService.isLoading.next(false))
        );
      })
    );
  }

  getPokemon(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(
      switchMap((pokemon: any) => {
        const typesObservables = pokemon.types.map((type: any) => this.http.get(type.type.url));
        return forkJoin(typesObservables).pipe(
          map((types: unknown) => {
            return {
              id: pokemon.id,
              name: pokemon.name,
              sprite: pokemon.sprites.other.dream_world.front_default,
              types: (types as any[]).map((type: any) => type.names.find((name: any) => name.language.name === 'es').name)
            };
          })
        );
      })
    );
  }

  nextPage(): Observable<any> {
    if (this.nextUrl) {
      this.page++;
      return this.getPokemons(this.nextUrl);
    }
    return of([]);
  }

  prevPage(): Observable<any> {
    if (this.prevUrl) {
      this.page--;
      return this.getPokemons(this.prevUrl);
    }
    return of([]);
  }


}