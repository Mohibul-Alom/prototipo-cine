import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  public getMoviesByName(name: string){

    return this.httpClient.get(`${environment.baseUrl}/movies/title/${name}`);

  }

  public getAuditoriumByMovieId(movieId: string){
    return this.httpClient.get(`${environment.baseUrl}/auditorium/${movieId}`);
  }

}
