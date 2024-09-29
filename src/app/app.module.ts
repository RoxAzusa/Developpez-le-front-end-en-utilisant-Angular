import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ChartModule } from 'primeng/chart';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, DetailPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ChartModule, RouterLink],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
