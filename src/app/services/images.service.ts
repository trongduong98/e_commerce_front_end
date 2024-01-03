import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImagesService {

    private apiUrl: string = "http://localhost:3009";
    constructor(private http: HttpClient) {}

    public postImageThumbnail(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/images/upload_thumbnail_images`, data);
    }

    public putImageThumbnail(data: any, id: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/images/update_thumbnail_images/${id}`, data);
    }


    public postImages(data: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/images/upload_images`, data);
    }

    public putImages(data: any, id: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/images/update_images/${id}`, data);
    }
}
