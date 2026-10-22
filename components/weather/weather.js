import { CONFIG } from '..config.js';

export function initWeather() {
  const cityBtn = document.getElementById('select-city');
  const cityNameEl = document.getElementById('weather-city-name');
  const tempEl = document.getElementById('weather-temp');
  const descEl = document.getElementById('weather-desc');

  async function fetchWeather(city = CONFIG.DEFAULT_CITY) {
    try {
      // Gọi API thực tế nếu có Key, hoặc fallback Mock data
      if (CONFIG.WEATHER_API_KEY && CONFIG.WEATHER_API_KEY !== 'YOUR_OPENWEATHERMAP_API_KEY') {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=vi&appid=${CONFIG.WEATHER_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.cod === 200) {
          if (cityNameEl) cityNameEl.textContent = data.name;
          if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
          if (descEl) descEl.textContent = data.weather[0].description;
          return;
        }
      }

      // Mock Data chuẩn đẹp khi chưa gắn API Key
      if (cityNameEl) cityNameEl.textContent = city;
      if (tempEl) tempEl.textContent = '22°C';
      if (descEl) descEl.textContent = 'Nhiều mây, se lạnh ☁️';
    } catch (err) {
      console.warn('Weather API Error, fallback applied:', err);
    }
  }

  // Sự kiện đổi thành phố khi bấm vào tên thành phố
  if (cityBtn) {
    cityBtn.addEventListener('click', () => {
      const newCity = prompt('Nhập tên thành phố (Ví dụ: Tokyo, Ishikawa, Osaka, Hanoi):', cityNameEl ? cityNameEl.textContent : 'Ishikawa');
      if (newCity && newCity.trim() !== '') {
        fetchWeather(newCity.trim());
      }
    });
  }

  fetchWeather();
}