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
  private responseLanguage:string = "pl-PL"
  private baseApiUrl:string = "https://api.themoviedb.org/3/search/movie"
  private baseConfigurationUrl:string = "https://api.themoviedb.org/3/configuration"
  private baseImageUrl:string = ""
  private imageSizes: { backdrop?:string[], poster?:string[] } = {}

  constructor(private http:HttpClient) { 
    this.setImageConfiguration()
  }

  get currentMovie(){
    return this.selectedMovie$
  }

  searchMovie(query:string){
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query).set('language', this.responseLanguage)
    return this.http.get<any>(this.baseApiUrl, { params })
      .map( res => 
        res.results.map(( result:Movie) => {
          return {
            ...result,
            backdropUrl:this.createPhotoUrl(result.backdrop_path, true),
            posterUrl:this.createPhotoUrl(result.poster_path, false)
          }
        })
      )
  }

  changeSelectedMovie(movie:Movie){
    this.selectedMovie$.next(movie)
  }

  setImageConfiguration(){
    const params = new HttpParams().set('api_key', this.apiKey)
    this.http.get<any>(this.baseConfigurationUrl, { params })
      .map(res => res)
      .subscribe((config) => {
        this.baseImageUrl = config.images.base_url,
        this.imageSizes = {
          backdrop:config.images.backdrop_sizes,
          poster:config.images.poster_sizes
        }
      })
  }

  createPhotoUrl(path:string, isBackdrop:boolean)
  {
    if(!path){
      return ""
    }
    const { backdrop, poster } = this.imageSizes
    const imageSize = isBackdrop ? backdrop[0] : poster[ this.imageSizes.poster.length - 1]

    return `${this.baseImageUrl}${imageSize}${path}`
  }
}
