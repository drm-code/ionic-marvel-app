import { Injectable } from '@angular/core';

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavoritesProvider {

  constructor() {
  }

  getFavorites(): Array<any> {
    let favorites = localStorage.getItem('marvel.favorites');
    return JSON.parse(favorites) || [];
  }

  setFavorites(favorites: Array<any>) {
    console.log(favorites);
    localStorage.removeItem('marvel.favorites');
    localStorage.setItem('marvel.favorites', JSON.stringify(favorites));
  }

}
