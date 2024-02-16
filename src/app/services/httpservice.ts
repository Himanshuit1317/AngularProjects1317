import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../models/appconfig';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient, private appConfig: AppConfig) {
        
        this.getConfig();
    }

    getConfig(): void {
        this.http.get('/assets/config.json').toPromise()
            .then((res: any) => {
                this.appConfig.baseUrl = res.baseUrl;
                console.log(res);
            })
            .catch(error => {
                console.error('An error occurred while fetching config:', error);
                throw error;
            });
    }

    get(url: string, options: {
        headers?: HttpHeaders;
        observe: 'response';
        params?: HttpParams;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
    }): Observable<HttpResponse<Object>> {
        return this.http.get(this.appConfig.baseUrl + url, options);
    }
}
