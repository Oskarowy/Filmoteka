import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { DisplayMovieComponent } from './display-movie.component';
import { SearchComponent } from './search/search.component';
import { MoviePreviewComponent } from './search/movie-preview/movie-preview.component';
import { FooterComponent } from './footer.component';
import { MovieService } from './movie.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DisplayMovieComponent,
    SearchComponent,
    MoviePreviewComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
