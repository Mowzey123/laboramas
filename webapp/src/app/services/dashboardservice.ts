import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class Dashbaordservice {
    private baseUrl = 'http://127.0.0.1:4000';

    constructor(private http: HttpClient) { }

    // get dashboard data
    filterDashbordData(dates): Observable<any> {
        console.log(dates);
        return this.http.post(`${this.baseUrl}/dashboardRoutes/filterDashbordData`, dates);
    }
}
