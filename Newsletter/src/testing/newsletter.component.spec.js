"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var newsletter_component_1 = require("../app/newsletter/newsletter.component");
var newsletter_service_1 = require("../app/newsletter/newsletter.service");
var MockNewsletterService = (function () {
    function MockNewsletterService() {
        this.test = 'Test Quote';
    }
    MockNewsletterService.prototype.getSourceTypes = function () {
        return Promise.resolve(this.test);
    };
    return MockNewsletterService;
}());
var mockHttpProvider = {
    deps: [testing_2.MockBackend, http_1.BaseRequestOptions],
    useFactory: function (backend, defaultOptions) {
        return new http_1.Http(backend, defaultOptions);
    }
};
describe('Newsletter Component (URL Template)', function () {
    var comp;
    var fixture;
    var de;
    var el;
    // async beforeEach
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [newsletter_component_1.NewsletterComponent],
            providers: [
                //{ provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: newsletter_service_1.NewsletterService, useClass: MockNewsletterService },
                { provide: http_1.Http, useValue: mockHttpProvider },
                testing_2.MockBackend,
                http_1.BaseRequestOptions
            ],
            imports: [forms_1.ReactiveFormsModule]
        })
            .compileComponents(); // compile template and css
    }));
    // synchronous beforeEach
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(newsletter_component_1.NewsletterComponent);
        comp = fixture.componentInstance; // BannerComponent test instance
        // query for the title <h2> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        el = de.nativeElement;
    });
    it('external html template loaded successfully', function () {
        expect(el.textContent).toEqual('Signup for our NewsLetter');
    });
});
//# sourceMappingURL=newsletter.component.spec.js.map