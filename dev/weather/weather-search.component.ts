import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {WeatherItem} from './weather-item';
//import 'txjs/Rx';
import {WEATHER_ITEMS} from './weather.data';
import {WeatherService} from './weather.service';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';


@Component({
   selector: 'my-weather-search',
   templateUrl: './weather-search.component.html',
   styleUrls: ['../../src/assets/css/weather-list.component.css'],
   providers: [WeatherService]
})

export class WeatherSearchComponent {
   sForm: FormGroup;
   constructor(private _weatherService: WeatherService){
     
     this.sForm = new FormGroup({
       location: new FormControl()
     });
   }
   
   onSubmit() {
     console.log('onSubmit');
     alert('formvalLocation' + this.sForm.value.location);
      this._weatherService.searchWeatherData(this.sForm.value.location)
      .subscribe(
         data => {
            const weatherItem = new WeatherItem(
            data.name, data.weather[0].description, data.main.temp);
            this._weatherService.addWeatherItem(weatherItem);
         }
      );
   }
}