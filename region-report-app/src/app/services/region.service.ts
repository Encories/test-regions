import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = 'https://run.mocky.io/v3/83c0a364-6ddd-4d95-acff-838215c54b67';

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region> {
    return this.http.get<Region>(this.apiUrl);
  }
}
