import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Csvservice {
    private baseUrl = 'http://127.0.0.1:4000';

    constructor(private http: HttpClient) { }

    // uploaf csv file to server
    upload(file: File): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();

      formData.append('file', file);

      const req = new HttpRequest('POST', `${this.baseUrl}/salesReports/uploadSalesReports`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

      return this.http.request(req);
    }

    // get files from server
    getAllSales(): Observable<any> {
      return this.http.post(`${this.baseUrl}/salesReports/getAllSales`, {});
    }


}
