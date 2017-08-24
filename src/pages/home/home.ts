import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environment/environment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public comics: any;
  public offset: number = 0;
  public searchQuery: string;
  public url: string = environment.comics + '?dateDescriptor=lastWeek&limit=20&apikey=' + environment.apikey + '&offset=';
  public searchTitle: string = 'Last week comics';
  public loading;

  constructor(public navCtrl: NavController, public http: Http, public loadingController: LoadingController) {
    this.http.get(this.url + this.offset)
      .map(res => res.json())
      .subscribe(data => {
        this.comics = data.data.results;
      });
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.offset++;
      this.http.get(this.url + this.offset)
        .map(res => res.json())
        .subscribe(data => {
          this.comics = this.comics.concat(data.data.results);
        });

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  doSearch(event) {
    if (event.charCode === 13) {
      this.loading = this.loadingController.create({
        content: 'Searching comics...'
      });
      this.loading.present();
      this.searchTitle = 'Search results'
      this.offset = 0;
      this.comics = [];
      if (isNaN(+this.searchQuery)) {
        this.url = environment.comics + '?title=' + this.searchQuery + '&limit=20&apikey=' + environment.apikey + '&offset=';
      } else {
        this.url = environment.comics + '?dateRange=' + this.searchQuery + '-01-01,' + this.searchQuery + '-12-31&limit=20&apikey=' + environment.apikey + '&offset=';
      }
      this.http.get(this.url + this.offset)
        .map(res => res.json())
        .subscribe(data => {
          this.comics = data.data.results;
          this.loading.dismiss();
        });
    }
  }

}
