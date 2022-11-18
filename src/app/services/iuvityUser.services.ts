import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UivityUserServices {
    protected basePath = environment.url;

    constructor(private http: HttpClient) {
    }

    public getAllUsers() {
        return this.http.get('users');
    }

    public createUser(modelUser: any) {
        return this.http.post('users/create', modelUser);
    }

    public deleteUser(idUser: number) {
        return this.http.delete('users/delete/' + idUser);
    }

    public updateUser(modelUser: any) {
        return this.http.put('users/update',modelUser);
    }
}
