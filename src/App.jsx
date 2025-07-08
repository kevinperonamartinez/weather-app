import { useState } from 'react';
import './App.css';


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) return;

    const API_KEY = 'c476017273ef26713a991efac22340c0';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Ciudad no encontrada');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
      setWeather(null);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌤️ WeatherApp</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Introduce una ciudad..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '70%',
            marginRight: '0.5rem',
          }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Buscar
        </button>
      </form>
      
      {weather && (
       <div className="weather-card">
       <h2>{weather.name}, {weather.sys.country}</h2>
       <p><strong>Temperatura:</strong> {weather.main.temp}°C</p>
       <p><strong>Sensación térmica:</strong> {weather.main.feels_like}°C</p>
       <p><strong>Clima:</strong> {weather.weather[0].description}</p>
       <p><strong>Humedad:</strong> {weather.main.humidity}%</p>
       <p><strong>Viento:</strong> {weather.wind.speed} km/h</p>
     </div>
     
      )}
      <footer className="footer">
<p>All rights Kevin Perona 2025</p>
</footer>
    </div>
    
  );

  

}

export default App;
