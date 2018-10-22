import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Movie } from './Movie';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private selectedMovie$:Subject<Movie> = new Subject<Movie>()
  private apiKey:string = "83c78958a6de0967f8627baa57dc575d"
  private baseApiUrl:string = "https://api.themoviedb.org/3/search/movie"
  
  constructor(private http:HttpClient) { }

  get currentMovie(){
    return this.selectedMovie$
  }

  searchMovie(query:string){
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query)
    return this.http.get<any>(this.baseApiUrl, { params }).map( res => res.results)
  }

  changeSelectedMovie(movie:Movie){
    this.selectedMovie$.next(movie)
  }
}
