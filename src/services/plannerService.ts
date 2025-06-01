// This is a mock service for the irrigation planner
// In a real implementation, this would connect to a database or API

interface PlannerData {
  crop: string;
  soilType: string;
  irrigationSource: string;
}

interface IrrigationDay {
  day: string;
  date: string;
  weather: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  irrigationNeeded: boolean;
  irrigationAmount: number;
  notes: string;
}

// Mock weather data for the next 7 days
const mockWeatherForecast = [
  { weather: 'Sunny', temperature: 32, humidity: 45 },
  { weather: 'Partly Cloudy', temperature: 30, humidity: 50 },
  { weather: 'Light Rain', temperature: 28, humidity: 65 },
  { weather: 'Rainy', temperature: 26, humidity: 75 },
  { weather: 'Heavy Rain', temperature: 25, humidity: 85 },
  { weather: 'Cloudy', temperature: 27, humidity: 60 },
  { weather: 'Sunny', temperature: 31, humidity: 50 },
];

// Soil moisture retention characteristics
const soilTypeCharacteristics = {
  'Sandy': { retentionRate: 0.3, initialMoisture: 200 }, // Low water retention
  'Loamy': { retentionRate: 0.7, initialMoisture: 400 }, // Good water retention
  'Clayey': { retentionRate: 0.9, initialMoisture: 500 }, // High water retention
  'Silty': { retentionRate: 0.6, initialMoisture: 350 },
  'Peaty': { retentionRate: 0.8, initialMoisture: 450 },
  'Chalky': { retentionRate: 0.4, initialMoisture: 250 },
  'Saline': { retentionRate: 0.5, initialMoisture: 300 },
};

// Crop water requirements
const cropWaterRequirements = {
  'Rice': { optimal: 600, min: 400, max: 800 },
  'Wheat': { optimal: 450, min: 300, max: 600 },
  'Sugarcane': { optimal: 500, min: 350, max: 700 },
  'Cotton': { optimal: 450, min: 300, max: 600 },
  'Maize': { optimal: 400, min: 250, max: 550 },
  'Potato': { optimal: 350, min: 200, max: 500 },
  'Onion': { optimal: 300, min: 200, max: 450 },
  'Tomato': { optimal: 400, min: 250, max: 550 },
  'Pulse': { optimal: 350, min: 200, max: 500 },
  'Groundnuts': { optimal: 400, min: 250, max: 550 },
  'Soybean': { optimal: 450, min: 300, max: 600 },
  'Barley': { optimal: 400, min: 250, max: 550 },
  'Cabbage': { optimal: 350, min: 200, max: 500 },
  'Coffee': { optimal: 500, min: 350, max: 700 },
  'Garden Flowers': { optimal: 300, min: 200, max: 450 },
};

// Function to get the day of the week for a given date offset
const getDayOfWeek = (offset: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + offset);
  return days[futureDate.getDay()];
};

// Function to get the formatted date for a given offset
const getFormattedDate = (offset: number): string => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + offset);
  return futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Calculate soil moisture based on weather and previous moisture
const calculateSoilMoisture = (
  previousMoisture: number,
  weather: string,
  retentionRate: number,
  temperature: number,
  humidity: number
): number => {
  let moistureLoss = 0;
  
  // Higher temperatures and lower humidity increase moisture loss
  moistureLoss = (temperature / 10) * (100 - humidity) / 100 * 50;
  
  // Rainfall adds moisture
  let moistureGain = 0;
  if (weather.includes('Rain')) {
    if (weather.includes('Light')) {
      moistureGain = 100;
    } else if (weather.includes('Heavy')) {
      moistureGain = 300;
    } else {
      moistureGain = 200;
    }
  }
  
  // Calculate new moisture level (with retention rate applied to previous moisture)
  const newMoisture = Math.max(0, (previousMoisture * retentionRate) - moistureLoss + moistureGain);
  
  return Math.round(newMoisture);
};

// Determine if irrigation is needed and how much
const calculateIrrigationNeeds = (
  currentMoisture: number,
  optimalMoisture: number,
  minMoisture: number,
  weather: string
): { needed: boolean; amount: number } => {
  // If it's raining heavily, no irrigation needed
  if (weather.includes('Heavy Rain')) {
    return { needed: false, amount: 0 };
  }
  
  // If it's going to rain soon, only irrigate if moisture is very low
  if (weather.includes('Light Rain') && currentMoisture > minMoisture * 0.7) {
    return { needed: false, amount: 0 };
  }
  
  // If moisture is below minimum threshold, irrigation is needed
  if (currentMoisture < minMoisture) {
    const deficit = optimalMoisture - currentMoisture;
    const irrigationAmount = Math.ceil(deficit / 20) * 5; // Round to nearest 5mm
    return { needed: true, amount: irrigationAmount };
  }
  
  return { needed: false, amount: 0 };
};

// Generate irrigation notes based on conditions
const generateNotes = (
  weather: string,
  irrigationNeeded: boolean,
  soilMoisture: number,
  optimalMoisture: number,
  minMoisture: number,
  irrigationSource: string
): string => {
  if (weather.includes('Rain')) {
    return 'Natural rainfall should provide adequate moisture. Monitor soil conditions.';
  }
  
  if (irrigationNeeded) {
    if (irrigationSource === 'Drip Irrigation' || irrigationSource === 'Sprinkler System') {
      return 'Automated irrigation recommended in early morning for optimal absorption.';
    } else {
      return 'Irrigate in early morning or late evening to minimize evaporation losses.';
    }
  }
  
  if (soilMoisture < optimalMoisture && soilMoisture >= minMoisture) {
    return 'Soil moisture adequate but monitor closely, especially if temperatures rise.';
  }
  
  return 'Soil moisture levels optimal. No irrigation required today.';
};

// Main function to generate a 7-day irrigation plan
export const generateIrrigationPlan = async (data: PlannerData): Promise<IrrigationDay[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { crop, soilType, irrigationSource } = data;
      
      // Get crop water requirements
      const cropRequirements = cropWaterRequirements[crop as keyof typeof cropWaterRequirements] || 
        { optimal: 400, min: 250, max: 550 };
      
      // Get soil characteristics
      const soilCharacteristics = soilTypeCharacteristics[soilType as keyof typeof soilTypeCharacteristics] || 
        { retentionRate: 0.6, initialMoisture: 350 };
      
      // Generate 7-day plan
      const plan: IrrigationDay[] = [];
      let currentMoisture = soilCharacteristics.initialMoisture;
      
      for (let i = 0; i < 7; i++) {
        const dayWeather = mockWeatherForecast[i];
        
        // Calculate soil moisture for the day
        currentMoisture = calculateSoilMoisture(
          currentMoisture,
          dayWeather.weather,
          soilCharacteristics.retentionRate,
          dayWeather.temperature,
          dayWeather.humidity
        );
        
        // Determine irrigation needs
        const irrigation = calculateIrrigationNeeds(
          currentMoisture,
          cropRequirements.optimal,
          cropRequirements.min,
          dayWeather.weather
        );
        
        // If irrigation is needed, update soil moisture
        if (irrigation.needed) {
          currentMoisture += irrigation.amount * 10; // Convert mm to moisture units
        }
        
        // Generate notes
        const notes = generateNotes(
          dayWeather.weather,
          irrigation.needed,
          currentMoisture,
          cropRequirements.optimal,
          cropRequirements.min,
          irrigationSource
        );
        
        // Add day to plan
        plan.push({
          day: getDayOfWeek(i),
          date: getFormattedDate(i),
          weather: dayWeather.weather,
          temperature: dayWeather.temperature,
          humidity: dayWeather.humidity,
          soilMoisture: currentMoisture,
          irrigationNeeded: irrigation.needed,
          irrigationAmount: irrigation.amount,
          notes: notes
        });
      }
      
      resolve(plan);
    }, 1500); // Simulate network delay
  });
};

// In a real implementation, we would connect to a database and use real weather API data:
/*
import axios from 'axios';
import { supabase } from './supabaseClient';

// Get crop data from database
const getCropData = async (cropName: string) => {
  const { data, error } = await supabase
    .from('crops')
    .select('*')
    .eq('name', cropName)
    .single();
    
  if (error) throw error;
  return data;
};

// Get real weather data
const getWeatherForecast = async (location: string) => {
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
  );
  
  // Process and return daily forecasts
  return processWeatherData(response.data);
};

export const generateIrrigationPlan = async (data: PlannerData): Promise<IrrigationDay[]> => {
  try {
    const cropData = await getCropData(data.crop);
    const weatherData = await getWeatherForecast(data.city);
    
    // Generate plan using real data
    // ...implementation with real data
    
    return plan;
  } catch (error) {
    console.error('Error generating irrigation plan:', error);
    throw error;
  }
};
*/