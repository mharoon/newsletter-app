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
var forms_1 = require("@angular/forms");
var newsletter_item_1 = require("./newsletter-item");
var newsletter_service_1 = require("./newsletter.service");
var response_item_1 = require("../response-item");
var NewsletterComponent = (function () {
    function NewsletterComponent(fb, newsletterService) {
        this.newsletterService = newsletterService;
        this.emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.subscriptionForm = fb.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.pattern(this.emailRegex)]],
            reason: '',
            source: ['', [forms_1.Validators.required]]
        });
    }
    NewsletterComponent.prototype.ngOnInit = function () {
        this.getSourceTypes();
    };
    NewsletterComponent.prototype.submitForm = function (form) {
        var _this = this;
        //mark hasError and hasSubmitted to false before ajax
        this.hasError = false;
        this.hasSuccess = false;
        var subscribe = new newsletter_item_1.NewsletterDTO();
        subscribe.Email = form.email;
        subscribe.Reason = form.reason;
        subscribe.SourceId = form.source;
        this.newsletterService.subscribeNewsletter(subscribe)
            .then(function (item) {
            if (response_item_1.STATUS_CODE.DuplicateEmail == item.StatusCode) {
                _this.hasError = true;
                _this.errorMessage = item.StatusMessage;
            }
            else {
                _this.hasSuccess = true;
                _this.subscriptionForm.reset({
                    source: ''
                });
            }
        }, function (reject) {
            _this.hasError = true;
            _this.errorMessage = response_item_1.STATUS_MSG.Error;
        });
    };
    NewsletterComponent.prototype.getSourceTypes = function () {
        var _this = this;
        this.newsletterService.getSourceTypes()
            .then(function (resp) { return _this.sourceTypes = resp; });
    };
    NewsletterComponent.prototype.emailExist = function (control) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.newsletterService.checkEmailExists(control.value)
                .then(function (item) {
                if (!item) {
                    resolve(null);
                }
                else {
                    console.log('matched');
                    resolve({ 'duplicated': true });
                }
            });
        });
    };
    return NewsletterComponent;
}());
NewsletterComponent = __decorate([
    core_1.Component({
        selector: 'greenfinch-app',
        templateUrl: './newsletter.component.html',
        providers: [newsletter_service_1.NewsletterService]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, newsletter_service_1.NewsletterService])
], NewsletterComponent);
exports.NewsletterComponent = NewsletterComponent;
//# sourceMappingURL=newsletter.component.js.map