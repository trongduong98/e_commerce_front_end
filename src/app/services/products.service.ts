import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiUrl: string = "http://localhost:3009";
    constructor(private http: HttpClient) {}

    public getProductList(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/products/get-products-with-thumbnail`);
    }

    public getProductById(productId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/products/product-detail/${productId}`);
    }

    public getProductGroupName(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/product-group/get-product-group-name`);
    }

    public createProduct(params: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/products/upload-product`, params);
    }

    public updateProduct(params: any, productId: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/products/update-product/${productId}`, params);
    }
}
