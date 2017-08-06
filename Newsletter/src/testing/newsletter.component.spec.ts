import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import {
    ResponseOptions,
    Response,
    Http,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { ComponentFixtureAutoDetect  } from '@angular/core/testing';


import { NewsletterComponent } from '../app/newsletter/newsletter.component';
import { NewsletterService } from '../app/newsletter/newsletter.service';


class MockNewsletterService {
    public test = 'Test Quote';

    getSourceTypes() {
        return Promise.resolve(this.test);
    }
}


const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};


describe('Newsletter Component (URL Template)', () => {

    let comp: NewsletterComponent;
    let fixture: ComponentFixture<NewsletterComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsletterComponent], // declare the test component
            providers: [
                //{ provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: NewsletterService, useClass: MockNewsletterService },
                { provide: Http, useValue: mockHttpProvider },
                MockBackend,
                BaseRequestOptions
            ],
            imports : [ReactiveFormsModule]
        })
            .compileComponents();  // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        fixture = TestBed.createComponent(NewsletterComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h2> by CSS element selector
        de = fixture.debugElement.query(By.css('h2'));

        el = de.nativeElement;
    });

    it('external html template loaded successfully', () => {
        expect(el.textContent).toEqual('Signup for our NewsLetter');
    });

});




