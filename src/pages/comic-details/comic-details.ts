import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FavoritesProvider } from '../../providers/favorites/favorites';

import { environment } from '../../environment/environment';

/**
 * Generated class for the ComicDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-comic-details',
  templateUrl: 'comic-details.html'
})
export class ComicDetailsPage {

  public comic: any = {};
  public creators: any = [];
  public characters: any = [];
  public isFavorite: boolean = false;
  public favorites: any = [];
  public loaded: boolean = false;
  public loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loadingController: LoadingController,
    public favoritesProvider: FavoritesProvider) {
      this.loading = this.loadingController.create({
        content: 'Loading comic...'
      });
      this.loading.present();
      let id: number = this.navParams.get('id');
      this.http.get(environment.comics + '/' + id + '?apikey=' + environment.apikey)
        .map(res => res.json())
        .subscribe(data => {
          this.comic = data.data.results[0];
          this.favorites = this.favoritesProvider.getFavorites();
          this.isFavorite = this.favorites.find(f => f.id === this.comic.id) ? true : false;
          this.http.get(environment.comics + '/' + id + '/creators?apikey=' + environment.apikey)
            .map(res => res.json())
            .subscribe(data => {
              this.creators = data.data.results;
              this.creators.map(o => {
                this.comic.creators.items.forEach(c => {
                  if (c.name === o.fullName) {
                    o.role = c.role;
                  }
                });
              });
              this.http.get(environment.comics + '/' + id + '/characters?apikey=' + environment.apikey)
                .map(res => res.json())
                .subscribe(data => {
                  this.characters = data.data.results;
                });
              this.loaded = true;
              this.loading.dismiss();
            });
        });
  }

  getPublishedDate() {
    return this.comic.dates.find(d => d.type === 'onsaleDate').date;
  }

  doFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.favorites.push({
        id: this.comic.id,
        thumbnail: this.comic.thumbnail.path + '.' + this.comic.thumbnail.extension,
        title: this.comic.title
      });
    } else {
      let index: number = this.favorites.findIndex(f => f.id === this.comic.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    }
    this.favoritesProvider.setFavorites(this.favorites);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComicDetailsPage');
  }

}
