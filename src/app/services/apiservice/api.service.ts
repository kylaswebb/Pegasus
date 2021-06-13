import {Injectable} from '@angular/core';
import {CustomError, KeyValueString} from '../../types/Utils';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    private URL = 'http://localhost:4200/api/'

    async get(url: string, params?: KeyValueString, headers?: Headers): Promise<Response> {
        if (params) {
            url = this.prepareEndpoint(url, params);
        }

        const response = await fetch(`${environment.helios}${url}`, {
            method: 'GET',
            headers: headers,
            credentials: 'include'
        });

        if (!response.ok) {
            throw this.handleError(response);
        }
        return response;
    }

    // Aanroepen post request om het aanmaken van nieuw record
    async post(url: string, body: string): Promise<Response> {

        const response = await fetch(`${environment.helios}${url}`, {
            method: 'POST',
            body: body,
        });

        if (response.status != 200) {  // 200 is normaal voor post
            throw this.handleError(response);
        }
        return response;
    }

    // Aanroepen put request om record te wijzigen
    async put(url: string, body: string): Promise<Response> {

        const response = await fetch(`${environment.helios}${url}`, {
            method: 'PUT',
            body: body,
        });

        if (response.status != 200) {  // 200 is normaal voor put
            throw this.handleError(response);
        }
        return response;
    }

    // Aanroepen delete request om record te verwijderen
    async delete(url: string, params: KeyValueString): Promise<void> {
        if (params) {
            url = this.prepareEndpoint(url, params);
        }

        const response = await fetch(`${environment.helios}${url}`, {
            method: 'DELETE',
        });

        if (response.status != 204) { // 204 is normaal voor delete
            throw this.handleError(response);
        }
    }

    // Aanroepen patch request om verwijderen record ongedaan te maken
    async patch(url: string, params: KeyValueString): Promise<void> {
        if (params) {
            url = this.prepareEndpoint(url, params);
        }

        const response = await fetch(`${environment.helios}${url}`, {
            method: 'PATCH',
        });

        if (response.status != 202) { // 204 is normaal voor patch
            throw this.handleError(response);
        }
    }

    private prepareEndpoint(url: string, params: KeyValueString): string {
        let args: string = "";

        // Loop vervolgens door het key:value object heen
        // Als het object op index 0 is, voeg vraagteken toe. Als object niet op de laatste plek staat, voeg & toe.
        Object.entries(params).forEach(([key, value]) => {
            if (args == "") {
                args = args.concat('?');
            } else {
                args = args.concat('&');
            }
            args = args.concat(`${key}=${value}`)
        })

        return url + args;
    }


    // Vul customer error  met http status code en de beschrijving uit X-Error-Messag
    private handleError(response: Response): CustomError {
        const error: CustomError = {
            responseCode: response.status,
            beschrijving: response.headers.get('X-Error-Message')
        }
        return error;
    }
}
