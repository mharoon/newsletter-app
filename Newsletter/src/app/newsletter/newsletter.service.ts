import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { APP_CONSTANTS } from '../app.constants'
import { NewsletterDTO, SourceTypesDTO } from './newsletter-item';
import { ResponseItem } from '../response-item';


interface IValidation {
    [key: string]: boolean;
}


@Injectable()
export class NewsletterService {
    private headers = new Headers({ 'Content-Type': 'application/json' });


    constructor(private http: Http) { }

    subscribeNewsletter(newsletter: NewsletterDTO): Promise<ResponseItem> {
        const url = `${APP_CONSTANTS.BASE_API_URL}/Subscribe`;

        return this.http.post(url, JSON.stringify(newsletter), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as ResponseItem)
            .catch(this.handleError);
    }

    getSourceTypes(): Promise<SourceTypesDTO> {
        const url = `${APP_CONSTANTS.BASE_API_URL}/GetSourceTypes`;

        return this.http.post(url, {}, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as SourceTypesDTO)
            .catch(this.handleError);
    }

    checkEmailExists(email: string): Promise<IValidation> {
        const url = `${APP_CONSTANTS.BASE_API_URL}/CheckEmailExists`;

        return this.http.post(url, JSON.stringify({ Email: email}), { headers: this.headers })
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }
}