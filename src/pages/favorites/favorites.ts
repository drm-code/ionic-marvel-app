import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ComicDetailsPage } from '../comic-details/comic-details';

import { FavoritesProvider } from '../../providers/favorites/favorites';

/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  public favorites: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public favoritesProvider: FavoritesProvider) {
    this.favorites = this.favoritesProvider.getFavorites();
  }

  comicDetails(id: number) {
    this.navCtrl.push(ComicDetailsPage, {id: id});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

}
