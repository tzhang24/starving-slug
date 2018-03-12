import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from './StorageService';

let apiurl = 'http://localhost:3000'

@Injectable()
export class ApiService {
    constructor(private http: HttpClient,
                private storage: StorageService) {
    }

    signIn(profile: gapi.auth2.BasicProfile, id_token: string) {
      console.log(profile, id_token);
      let body = {
        id_token: id_token,
        username: profile.getName(),
        // image: profile.given_name
      }
      return this.http.post(`${apiurl}/user`, body);
    }

    updateProfile(profile: Object) {
      let permissions = this.storage.getTokenString();
      console.log(profile, permissions);
      let headers = {token: permissions}
      return this.http.post(`${apiurl}/setProfile`, profile, {headers: headers});
    }

    getUser(username: string): Observable<any> {
      console.log(`Fetching user ${username}`)
      return this.http.get(`${apiurl}/profile/${username}`);
    }

    getRecipe(id: string): Observable<any> {
        console.log(`Fetching recipe ${name}`);
        return this.http.get(`${apiurl}/recipe/${id}`);
    }

    createRecipe(res: Object[]): Observable<any> {
        let permissions = this.storage.getTokenString()
        const headers = {token: permissions};
        return this.http.post(`${apiurl}/recipe`, res, { headers: headers });
    }

    getSearch(name: string): Observable<any> {
        console.log(`Fetching recipe ${name}`);
        return this.http.get(`${apiurl}/search?name=${name}`);
    }

    getFilter(name: string, author: string, tag: string): Observable<any> {
        console.log(`Fetching recipe ${name}`);
        return this.http.get(`${apiurl}/search?name=${name}&author=${author}&tag=${tag}`);
    }

}
