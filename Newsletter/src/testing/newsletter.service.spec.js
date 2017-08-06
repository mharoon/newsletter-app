"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var newsletter_service_1 = require("../app/newsletter/newsletter.service");
var app_constants_1 = require("../app/app.constants");
describe('NewsletterService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                { provide: app_constants_1.APP_CONSTANTS.BASE_API_URL, useValue: 'http://api.greenfinch.com/getSourceTypes' },
                newsletter_service_1.NewsletterService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend },
            ]
        });
    });
    describe('getSourceTypes()', function () {
        it('should return an Observable<Array<SourceTypeDTO>>', testing_1.inject([newsletter_service_1.NewsletterService, http_1.XHRBackend], function (newsletterService, mockBackend) {
            var mockResponse = {
                data: [
                    { id: 0, name: 'Advert' },
                    { id: 1, name: 'Word Of Mouth' },
                    { id: 2, name: 'Other' }
                ]
            };
            mockBackend.connections.subscribe(function (connection) {
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });
            newsletterService.getSourceTypes().then(function (sourceTypes) {
                expect(sourceTypes.data.length).toBe(3);
                expect(sourceTypes.data[0].name).toEqual('Advert');
                expect(sourceTypes.data[1].name).toEqual('Word Of Mouth');
                expect(sourceTypes.data[2].name).toEqual('Other');
            });
        }));
    });
});
//# sourceMappingURL=newsletter.service.spec.js.map