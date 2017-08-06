import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { NewsletterDTO, SourceTypesDTO } from './newsletter-item';
import { NewsletterService } from './newsletter.service';

import { ResponseItem, STATUS_CODE, STATUS_MSG } from '../response-item';


@Component({
  selector: 'greenfinch-app',
  templateUrl: './newsletter.component.html',
  providers: [NewsletterService]

})
export class NewsletterComponent  {
    private emailRegex: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    public hasSuccess: boolean;
    public hasError: boolean;
    public errorMessage: string;

    responseItem: ResponseItem;
    subscriptionForm: FormGroup;
    sourceTypes: SourceTypesDTO;

    constructor(fb: FormBuilder, private newsletterService: NewsletterService) {
        this.subscriptionForm = fb.group({
            email: [null, [Validators.required,Validators.pattern(this.emailRegex)]], //add in validation array for async, this.emailExist.bind(this)
            reason: '',
            source: ['', [Validators.required]]

        })
    }

    ngOnInit(): void {
        this.getSourceTypes();
    }

    submitForm(form: any): void {
        //mark hasError and hasSubmitted to false before ajax
        this.hasError = false;
        this.hasSuccess = false; 

        let subscribe = new NewsletterDTO();
        subscribe.Email = form.email;
        subscribe.Reason = form.reason;
        subscribe.SourceId = form.source;

        this.newsletterService.subscribeNewsletter(subscribe)
            .then(
            item => {

                if (STATUS_CODE.DuplicateEmail == item.StatusCode) {
                    this.hasError = true;
                    this.errorMessage = item.StatusMessage;
                } else {

                    this.hasSuccess = true;
                    this.subscriptionForm.reset({
                        source: ''
                    });
                }

               
            },
            reject => {
                this.hasError = true;
                this.errorMessage = STATUS_MSG.Error;
            });
    }

    getSourceTypes() {
        this.newsletterService.getSourceTypes()
            .then(resp => this.sourceTypes = resp)
    }

    

    emailExist(control: FormControl): { [key: string]: any } {
        return new Promise(resolve => {
            this.newsletterService.checkEmailExists(control.value)
                .then(item => {
                    if (!item) {
                        resolve(null)
                    } else {
                        console.log('matched');
                        resolve({'duplicated': true})
                    }
                })
        });
    }

}
