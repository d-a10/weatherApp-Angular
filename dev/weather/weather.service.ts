import {Injectable} from '@angular/core';
import {WEATHER_ITEMS} from './weather.data';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {WeatherItem} from './weather-item';
import { map } from 'rxjs/operators';

//import 'rxjs/Rx';

@Injectable()

export class WeatherService {
   
   constructor(private _http: HttpClient){}
   
   getWeatherItems(){
      return WEATHER_ITEMS;
   }
  
   addWeatherItem(weatherItem: WeatherItem){
     alert('weather item: ' + weatherItem);
      WEATHER_ITEMS.push(weatherItem);
   }
   
   searchWeatherData(cityName: string): Observable<any>{
      return this._http
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=a9886e11c14fc0c948035507f926527c&units=imperial`)
      .catch(error => {
         console.error(error);
         return Observable.throw(error.json())
      });
   }
}