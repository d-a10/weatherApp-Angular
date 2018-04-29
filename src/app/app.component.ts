import { Component } from '@angular/core';
import {WeatherListComponent} from "../../dev/weather/weather-list.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Weather App';
}
