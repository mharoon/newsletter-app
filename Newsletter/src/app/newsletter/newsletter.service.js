"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var app_constants_1 = require("../app.constants");
var NewsletterService = (function () {
    function NewsletterService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    NewsletterService.prototype.subscribeNewsletter = function (newsletter) {
        var url = app_constants_1.APP_CONSTANTS.BASE_API_URL + "/Subscribe";
        return this.http.post(url, JSON.stringify(newsletter), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NewsletterService.prototype.getSourceTypes = function () {
        var url = app_constants_1.APP_CONSTANTS.BASE_API_URL + "/GetSourceTypes";
        return this.http.post(url, {}, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NewsletterService.prototype.checkEmailExists = function (email) {
        var url = app_constants_1.APP_CONSTANTS.BASE_API_URL + "/CheckEmailExists";
        return this.http.post(url, JSON.stringify({ Email: email }), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    NewsletterService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return NewsletterService;
}());
NewsletterService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], NewsletterService);
exports.NewsletterService = NewsletterService;
//# sourceMappingURL=newsletter.service.js.map