import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl: string = "http://localhost:3009";
    constructor(private http: HttpClient) {}

    public login(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/account/login`, data);
    }

    public checkToken(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/user/check_token`);
    }

}
