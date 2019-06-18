import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Fruit } from '../models/fruit.model';

@Injectable({ providedIn: 'root' })
export class FruitsService {

  private rootUrl: string = '/api';

  constructor(private http: HttpClient) { }

  public getFruits(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(this.rootUrl + '/fruits');
  }

  public createFruit(fruit: Fruit): Observable<Fruit> { 
    return this.http.post<Fruit>(this.rootUrl + '/fruits', fruit);
  }
}