import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { NewsletterService } from '../app/newsletter/newsletter.service';
import { APP_CONSTANTS } from '../app/app.constants';

describe('NewsletterService', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: APP_CONSTANTS.BASE_API_URL, useValue: 'http://api.greenfinch.com/getSourceTypes' },
                NewsletterService,
                { provide: XHRBackend, useClass: MockBackend },
            ]
        });
    });

    describe('getSourceTypes()', () => {

        it('should return an Observable<Array<SourceTypeDTO>>',
            inject([NewsletterService, XHRBackend], (newsletterService: any, mockBackend:any) => {

                const mockResponse = {
                    data: [
                        { id: 0, name: 'Advert' },
                        { id: 1, name: 'Word Of Mouth' },
                        { id: 2, name: 'Other' }
                    ]
                };

                mockBackend.connections.subscribe((connection:any) => {
                    connection.mockRespond(new Response(new ResponseOptions({
                        body: JSON.stringify(mockResponse)
                    })));
                });

                newsletterService.getSourceTypes().then((sourceTypes: any) => {
                    expect(sourceTypes.data.length).toBe(3);
                    expect(sourceTypes.data[0].name).toEqual('Advert');
                    expect(sourceTypes.data[1].name).toEqual('Word Of Mouth');
                    expect(sourceTypes.data[2].name).toEqual('Other');
                });

            }));
    });

});