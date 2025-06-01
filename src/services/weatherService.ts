// This is a mock service since we can't actually connect to the OpenWeatherAPI
// In a real implementation, you would use the API key and make actual API calls

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  date: string;
}

interface ForecastDay {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}

// Mock weather data
const mockWeatherData: Record<string, WeatherData> = {
  'new delhi': {
    city: 'New Delhi',
    country: 'IN',
    temperature: 32,
    description: 'clear sky',
    icon: '01d',
    humidity: 45,
    windSpeed: 8,
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  },
  'mumbai': {
    city: 'Mumbai',
    country: 'IN',
    temperature: 30,
    description: 'scattered clouds',
    icon: '03d',
    humidity: 75,
    windSpeed: 12,
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  },
  'bangalore': {
    city: 'Bangalore',
    country: 'IN',
    temperature: 28,
    description: 'light rain',
    icon: '10d',
    humidity: 65,
    windSpeed: 6,
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }
};

// Mock forecast data generator
const generateMockForecast = (city: string): ForecastDay[] => {
  const forecasts: ForecastDay[] = [];
  const baseTemp = mockWeatherData[city.toLowerCase()]?.temperature || 30;
  const descriptions = ['clear sky', 'few clouds', 'scattered clouds', 'light rain', 'moderate rain'];
  
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecasts.push({
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      temperature: baseTemp + Math.floor(Math.random() * 5) - 2, // Vary by +/- 2 degrees
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
      icon: '01d' // This would normally be determined by the weather condition
    });
  }
  
  return forecasts;
};

// Mock API functions
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedCity = city.toLowerCase();
      if (mockWeatherData[normalizedCity]) {
        resolve(mockWeatherData[normalizedCity]);
      } else {
        // Default data for cities not in our mock
        resolve({
          city: city.charAt(0).toUpperCase() + city.slice(1),
          country: 'IN',
          temperature: 28 + Math.floor(Math.random() * 8),
          description: 'scattered clouds',
          icon: '03d',
          humidity: 40 + Math.floor(Math.random() * 40),
          windSpeed: 5 + Math.floor(Math.random() * 10),
          date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
        });
      }
    }, 800); // Simulate network delay
  });
};

export const fetchForecast = async (city: string): Promise<ForecastDay[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockForecast(city));
    }, 800); // Simulate network delay
  });
};

// In a real implementation, you would use the OpenWeatherAPI like this:
/*
const API_KEY = 'your_openweather_api_key';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const fetchForecast = async (city: string): Promise<ForecastDay[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data not available');
    }
    
    const data = await response.json();
    const forecastList = data.list;
    
    // Get one forecast per day (noon time)
    const dailyForecasts: ForecastDay[] = [];
    const processedDates = new Set();
    
    for (const forecast of forecastList) {
      const date = new Date(forecast.dt * 1000);
      const dateString = date.toLocaleDateString();
      
      // Only take one forecast per day
      if (!processedDates.has(dateString)) {
        processedDates.add(dateString);
        
        dailyForecasts.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          temperature: forecast.main.temp,
          description: forecast.weather[0].description,
          icon: forecast.weather[0].icon
        });
        
        // We only need 5 days
        if (dailyForecasts.length >= 5) {
          break;
        }
      }
    }
    
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};
*/