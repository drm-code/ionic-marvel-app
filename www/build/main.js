webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComicDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__environment_environment__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ComicDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ComicDetailsPage = (function () {
    function ComicDetailsPage(navCtrl, navParams, http, loadingController, favoritesProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingController = loadingController;
        this.favoritesProvider = favoritesProvider;
        this.comic = {};
        this.creators = [];
        this.characters = [];
        this.isFavorite = false;
        this.favorites = [];
        this.loaded = false;
        this.loading = this.loadingController.create({
            content: 'Loading comic...'
        });
        this.loading.present();
        var id = this.navParams.get('id');
        this.http.get(__WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].comics + '/' + id + '?apikey=' + __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].apikey)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.comic = data.data.results[0];
            _this.favorites = _this.favoritesProvider.getFavorites();
            _this.isFavorite = _this.favorites.find(function (f) { return f.id === _this.comic.id; }) ? true : false;
            _this.http.get(__WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].comics + '/' + id + '/creators?apikey=' + __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].apikey)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.creators = data.data.results;
                _this.creators.map(function (o) {
                    _this.comic.creators.items.forEach(function (c) {
                        if (c.name === o.fullName) {
                            o.role = c.role;
                        }
                    });
                });
                _this.http.get(__WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].comics + '/' + id + '/characters?apikey=' + __WEBPACK_IMPORTED_MODULE_5__environment_environment__["a" /* environment */].apikey)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.characters = data.data.results;
                });
                _this.loaded = true;
                _this.loading.dismiss();
            });
        });
    }
    ComicDetailsPage.prototype.getPublishedDate = function () {
        return this.comic.dates.find(function (d) { return d.type === 'onsaleDate'; }).date;
    };
    ComicDetailsPage.prototype.doFavorite = function () {
        var _this = this;
        this.isFavorite = !this.isFavorite;
        if (this.isFavorite) {
            this.favorites.push({
                id: this.comic.id,
                thumbnail: this.comic.thumbnail.path + '.' + this.comic.thumbnail.extension,
                title: this.comic.title
            });
        }
        else {
            var index = this.favorites.findIndex(function (f) { return f.id === _this.comic.id; });
            if (index !== -1) {
                this.favorites.splice(index, 1);
            }
        }
        this.favoritesProvider.setFavorites(this.favorites);
    };
    ComicDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ComicDetailsPage');
    };
    return ComicDetailsPage;
}());
ComicDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-comic-details',template:/*ion-inline-start:"/home/yonathan/projects/ionic-marvel-app/src/pages/comic-details/comic-details.html"*/'<!--\n  Generated template for the ComicDetailsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="red">\n    <ion-title>Comic details</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-grid *ngIf="loaded">\n    <ion-row>\n      <ion-col>\n        <h3 text-center>{{ comic.title }}</h3>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6 offset-3>\n        <img [src]="comic.thumbnail.path + \'.\' + comic.thumbnail.extension">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <button ion-button icon-only clear item-end (click)="doFavorite()">\n          <ion-icon class="favorite" color="red" name="ios-heart" isActive="{{ isFavorite }}"></ion-icon>\n        </button>\n        <ion-badge color="indigo">Published: {{ getPublishedDate() | date }}</ion-badge>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-col padding>\n        <h3 text-center>{{ comic.format }}</h3>\n        <p class="gray" *ngIf="!comic.description" text-center>There is no description for this comic.</p>\n        <p class="gray" *ngIf="comic.description">{{ comic.description}}</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col padding>\n        <h3 text-center>Images</h3>\n        <p class="gray" *ngIf="comic.images.length === 0" text-center>There are no images for this comic.</p>\n        <ion-row>\n          <ion-col col-4 *ngFor="let image of comic.images">\n            <img [src]="image.path + \'.\' + image.extension">\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col padding>\n        <h3 text-center>Creators</h3>\n        <p class="gray" *ngIf="creators.length === 0" text-center>There is no creators found for this comic.</p>\n        <ion-list *ngIf="creators.length > 0">\n          <ion-item *ngFor="let creator of creators">\n            <h2>{{ creator.fullName}}</h2>\n            <p>{{ creator.comics.available }} Comics / {{ creator.series.available }} Series</p>\n            <ion-badge color="indigo" item-end>{{ creator.role }}</ion-badge>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col padding>\n        <h3 text-center>Characters</h3>\n        <p class="gray" *ngIf="characters.length === 0" text-center>There are no characters found for this comic.</p>\n        <ion-row>\n          <ion-col col-6 *ngFor="let character of characters">\n            <ion-card>\n              <img [src]="character.thumbnail.path + \'.\' + character.thumbnail.extension"/>\n              <ion-card-content>\n                <p>{{ character.name }}</p>\n                <ion-icon name="star"></ion-icon>\n                {{ character.comics.available }} Comics\n              </ion-card-content>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/yonathan/projects/ionic-marvel-app/src/pages/comic-details/comic-details.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_favorites_favorites__["a" /* FavoritesProvider */]])
], ComicDetailsPage);

//# sourceMappingURL=comic-details.js.map

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 151;

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__favorites_favorites__["a" /* FavoritesPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/yonathan/projects/ionic-marvel-app/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Comics" tabIcon="book"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Favorites" tabIcon="ios-heart"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/yonathan/projects/ionic-marvel-app/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comic_details_comic_details__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_favorites_favorites__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__environment_environment__ = __webpack_require__(198);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(navCtrl, http, loadingController, favoritesProvider) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.loadingController = loadingController;
        this.favoritesProvider = favoritesProvider;
        this.offset = 0;
        this.searchQuery = '';
        this.url = __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].comics + '?dateDescriptor=lastWeek&limit=20&apikey=' + __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].apikey + '&offset=';
        this.searchTitle = 'Last week comics';
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = this.loadingController.create({
            content: 'Searching comics...'
        });
        this.loading.present();
        this.http.get(this.url + this.offset)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.comics = data.data.results;
            _this.comics.map(function (c) {
                var index = _this.favoritesProvider.getFavorites().findIndex(function (f) { return f.id === c.id; });
                if (index !== -1) {
                    c.isFavorite = true;
                    return true;
                }
            });
            _this.loading.dismiss();
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        console.log('Begin async operation');
        setTimeout(function () {
            _this.offset++;
            _this.http.get(_this.url + _this.offset)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.comics = _this.comics.concat(data.data.results);
                _this.comics.map(function (c) {
                    var index = _this.favoritesProvider.getFavorites().findIndex(function (f) { return f.id === c.id; });
                    if (index !== -1) {
                        c.isFavorite = true;
                        return true;
                    }
                });
            });
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    HomePage.prototype.doSearch = function (event) {
        var _this = this;
        if (event.charCode === 13) {
            this.searchTitle = '';
            this.loading = this.loadingController.create({
                content: 'Searching comics...'
            });
            this.loading.present();
            this.offset = 0;
            this.comics = [];
            if (this.searchQuery === '') {
                this.url = __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].comics + '?dateDescriptor=lastWeek&limit=20&apikey=' + __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].apikey + '&offset=';
            }
            else {
                if (isNaN(+this.searchQuery)) {
                    this.url = __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].comics + '?title=' + this.searchQuery + '&limit=20&apikey=' + __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].apikey + '&offset=';
                }
                else {
                    this.url = __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].comics + '?dateRange=' + this.searchQuery + '-01-01,' + this.searchQuery + '-12-31&limit=20&apikey=' + __WEBPACK_IMPORTED_MODULE_6__environment_environment__["a" /* environment */].apikey + '&offset=';
                }
            }
            this.http.get(this.url + this.offset)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.comics = data.data.results;
                _this.comics.map(function (c) {
                    var index = _this.favoritesProvider.getFavorites().findIndex(function (f) { return f.id === c.id; });
                    if (index !== -1) {
                        c.isFavorite = true;
                        return true;
                    }
                });
                _this.loading.dismiss();
                _this.searchTitle = _this.searchQuery === '' ? 'Last week comics' : 'Search results';
            });
        }
    };
    HomePage.prototype.comicDetails = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__comic_details_comic_details__["a" /* ComicDetailsPage */], { id: id });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.http.get(this.url + this.offset)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.comics = data.data.results;
            _this.comics.map(function (c) {
                var index = _this.favoritesProvider.getFavorites().findIndex(function (f) { return f.id === c.id; });
                if (index !== -1) {
                    c.isFavorite = true;
                    return true;
                }
            });
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/home/yonathan/projects/ionic-marvel-app/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="red">\n    <ion-title>Marvel comics finder</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar\n    placeholder="Comic title or year. E.g. 2002"\n    [(ngModel)]="searchQuery"\n    (keypress)="doSearch($event)">\n  </ion-searchbar>\n  <ion-list>\n    <ion-item *ngFor="let comic of comics">\n      <ion-thumbnail item-start>\n        <img [src]="comic.thumbnail.path+\'.\'+comic.thumbnail.extension">\n      </ion-thumbnail>\n      <h2>{{ comic.title }}</h2>\n      <p>{{ comic.format }}</p>\n      <ion-icon *ngIf="comic.isFavorite" name="ios-heart" isActive="true" color="red"></ion-icon>\n      <button ion-button clear item-end (click)="comicDetails(comic.id)">View</button>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n   <ion-infinite-scroll-content\n     loadingText="Loading more data..."></ion-infinite-scroll-content>\n </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/home/yonathan/projects/ionic-marvel-app/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_favorites_favorites__["a" /* FavoritesProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var base = 'https://gateway.marvel.com:443/v1/public/';
var environment = {
    apikey: '8ff967a8d19772d262f7d39b1ffdc636',
    comics: base + 'comics'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__comic_details_comic_details__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_favorites_favorites__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FavoritesPage = (function () {
    function FavoritesPage(navCtrl, navParams, favoritesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.favoritesProvider = favoritesProvider;
        this.favorites = [];
        this.favorites = this.favoritesProvider.getFavorites();
    }
    FavoritesPage.prototype.comicDetails = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__comic_details_comic_details__["a" /* ComicDetailsPage */], { id: id });
    };
    FavoritesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavoritesPage');
    };
    return FavoritesPage;
}());
FavoritesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-favorites',template:/*ion-inline-start:"/home/yonathan/projects/ionic-marvel-app/src/pages/favorites/favorites.html"*/'<!--\n  Generated template for the FavoritesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar color="red">\n    <ion-title>Favorites</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-grid>\n    <ion-col padding text-center *ngIf="favoritesProvider.getFavorites().length === 0">\n      <ion-icon color="gray" name="ios-sad" isActive="false" class="not-favorites"></ion-icon>\n      <h2 class="gray">You don\'t have favorites</h2>\n      <p class="gray">You can save your comics here by tapping on the <strong>heart button</strong> in the comic details page.</p>\n      <ion-icon name="ios-heart" color="red" class="heart"></ion-icon>\n    </ion-col>\n    <ion-col *ngIf="favoritesProvider.getFavorites().length > 0">\n      <ion-row>\n        <ion-col col-6 *ngFor="let favorite of favoritesProvider.getFavorites()">\n          <ion-card (click)="comicDetails(favorite.id)">\n            <img [src]="favorite.thumbnail"/>\n            <ion-card-content>\n              <p class="gray">{{ favorite.title }}</p>\n            </ion-card-content>\n          </ion-card>\n        </ion-col>\n      </ion-row>\n    </ion-col>\n  </ion-grid>\n\n</ion-content>\n'/*ion-inline-end:"/home/yonathan/projects/ionic-marvel-app/src/pages/favorites/favorites.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_favorites_favorites__["a" /* FavoritesProvider */]])
], FavoritesPage);

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(219);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_comic_details_comic_details__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_favorites_favorites__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_comic_details_comic_details__["a" /* ComicDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__["a" /* FavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_comic_details_comic_details__["a" /* ComicDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_favorites_favorites__["a" /* FavoritesPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_11__providers_favorites_favorites__["a" /* FavoritesProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/yonathan/projects/ionic-marvel-app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/yonathan/projects/ionic-marvel-app/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*
  Generated class for the FavoritesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var FavoritesProvider = (function () {
    function FavoritesProvider() {
    }
    FavoritesProvider.prototype.getFavorites = function () {
        var favorites = localStorage.getItem('marvel.favorites');
        return JSON.parse(favorites) || [];
    };
    FavoritesProvider.prototype.setFavorites = function (favorites) {
        console.log(favorites);
        localStorage.removeItem('marvel.favorites');
        localStorage.setItem('marvel.favorites', JSON.stringify(favorites));
    };
    return FavoritesProvider;
}());
FavoritesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], FavoritesProvider);

//# sourceMappingURL=favorites.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map