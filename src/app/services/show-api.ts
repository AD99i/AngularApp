import {inject, Injectable} from '@angular/core';
import {Show} from '../models/show';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShowApi {
  private readonly http: HttpClient = inject(HttpClient);

  getShows(): Observable<Show[]> {
    return this.http.get<Show[]>(`${environment.BASE_URL_SHOW_API}/shows`);
  }

  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${environment.BASE_URL_SHOW_API}/shows/${id}`);
  }

}
