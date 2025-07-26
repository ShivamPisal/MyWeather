import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class weather{
  constructor(private http: HttpClient) {}

  async getWeather(city: string): Promise<any> {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoData: any = await this.http.get(geoUrl).toPromise();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City not found');
    }

    const lat = geoData.results[0].latitude;
    const lon = geoData.results[0].longitude;
    const cityName = geoData.results[0].name;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,weathercode&timezone=auto`;
    const weatherData: any = await this.http.get(weatherUrl).toPromise();

    return {
      city: cityName,
      current: weatherData.current_weather,
      forecast: weatherData.daily
    };
  }

  getIcon(code: number): string {
    const icons: any = {
      0: '01d', 1: '02d', 2: '03d', 3: '04d', 45: '50d',
      51: '09d', 61: '10d', 71: '13d', 95: '11d'
    };
    return `https://openweathermap.org/img/wn/${icons[code] || '04d'}.png`;
  }
}
