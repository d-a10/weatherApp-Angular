import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {WeatherItem} from './weather-item';
//import 'txjs/Rx';
import {WEATHER_ITEMS} from './weather.data';
import {WeatherService} from './weather.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
   selector: 'my-weather-search',
   templateUrl: './weather-search.component.html',
   styleUrls: ['../../src/assets/css/weather-list.component.css'],
   providers: [WeatherService]
})

export class WeatherSearchComponent implements OnInit {
   sForm: FormGroup;
   private searchStream = new Subject<string>();
   data: any = {};
   constructor(private _weatherService: WeatherService){
     
     this.sForm = new FormGroup({
       location: new FormControl()
     });
   }
   
   onSubmit() {
      const weatherItem = new WeatherItem(
      this.data.name, this.data.weather[0].description, this.data.main.temp);
      this._weatherService.addWeatherItem(weatherItem);
   }
  
  onSearchLocation(cityName: string){
    this.searchStream
    .next(cityName);
  }
  
  ngOnInit(){
    this.searchStream
    .pipe(switchMap((input: string) => this._weatherService.searchWeatherData(input)))
    .subscribe(
      data => this.data = data
    );
  }
} 