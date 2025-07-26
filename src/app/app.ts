import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { weather } from './Services/weather';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  city = '';
  current: any;
  forecast: any[] = [];
  icon = '';
  location = '';

  constructor(private weather: weather) {}

  async getWeather() {
    if (!this.city.trim()) return alert('Enter city name');
    try {
      const data = await this.weather.getWeather(this.city);
      this.location = data.city;
      this.current = data.current;
      this.icon = this.weather.getIcon(data.current.weathercode);

      this.forecast = [];
      for (let i = 1; i <= 3; i++) {
        this.forecast.push({
          date: data.forecast.time[i],
          temp: data.forecast.temperature_2m_max[i],
          icon: this.weather.getIcon(data.forecast.weathercode[i])
        });
      }
    } catch {
      alert('City not found or error occurred');
    }
  }
}
