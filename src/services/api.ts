import axios from 'axios';
import { MarketOrder, GoldPrice, MarketHistory, Item, Location } from '../types';

const API_BASE_URLS = {
  americas: 'https://west.albion-online-data.com',
  asia: 'https://east.albion-online-data.com',
  europe: 'https://europe.albion-online-data.com'
};

const ITEMS_DATA_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/items.json';
const WORLD_DATA_URL = 'https://raw.githubusercontent.com/ao-data/ao-bin-dumps/master/formatted/world.json';

class AlbionApiService {
  private serverRegion: keyof typeof API_BASE_URLS = 'americas';

  constructor(region: keyof typeof API_BASE_URLS = 'americas') {
    this.serverRegion = region;
  }

  private getBaseUrl(): string {
    return API_BASE_URLS[this.serverRegion];
  }

  async getCurrentPrices(itemIds: string[], locations?: string[], qualities?: number[]): Promise<MarketOrder[]> {
    try {
      const params = new URLSearchParams();
      
      if (locations && locations.length > 0) {
        params.append('locations', locations.join(','));
      }
      
      if (qualities && qualities.length > 0) {
        params.append('qualities', qualities.join(','));
      }

      const url = `${this.getBaseUrl()}/api/v2/stats/prices/${itemIds.join(',')}.json?${params.toString()}`;
      const response = await axios.get<MarketOrder[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching current prices:', error);
      throw error;
    }
  }

  async getMarketHistory(
    itemIds: string[], 
    locations?: string[], 
    qualities?: number[], 
    timeScale: number = 24,
    startDate?: string,
    endDate?: string
  ): Promise<MarketHistory[]> {
    try {
      const params = new URLSearchParams();
      params.append('time-scale', timeScale.toString());
      
      if (locations && locations.length > 0) {
        params.append('locations', locations.join(','));
      }
      
      if (qualities && qualities.length > 0) {
        params.append('qualities', qualities.join(','));
      }

      if (startDate) {
        params.append('date', startDate);
      }

      if (endDate) {
        params.append('end_date', endDate);
      }

      const url = `${this.getBaseUrl()}/api/v2/stats/history/${itemIds.join(',')}.json?${params.toString()}`;
      const response = await axios.get<MarketHistory[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching market history:', error);
      throw error;
    }
  }

  async getGoldPrices(startDate?: string, endDate?: string, count?: number): Promise<GoldPrice[]> {
    try {
      const params = new URLSearchParams();
      
      if (startDate) {
        params.append('date', startDate);
      }

      if (endDate) {
        params.append('end_date', endDate);
      }

      if (count) {
        params.append('count', count.toString());
      }

      const url = `${this.getBaseUrl()}/api/v2/stats/gold.json?${params.toString()}`;
      const response = await axios.get<GoldPrice[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching gold prices:', error);
      throw error;
    }
  }

  async getMarketView(itemIds: string[], locations?: string[], qualities?: number[]): Promise<MarketOrder[]> {
    try {
      const params = new URLSearchParams();
      
      if (locations && locations.length > 0) {
        params.append('locations', locations.join(','));
      }
      
      if (qualities && qualities.length > 0) {
        params.append('qualities', qualities.join(','));
      }

      const url = `${this.getBaseUrl()}/api/v2/stats/view/${itemIds.join(',')}?${params.toString()}`;
      const response = await axios.get<MarketOrder[]>(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching market view:', error);
      throw error;
    }
  }

  async getItemsData(): Promise<Item[]> {
    try {
      const response = await axios.get<Item[]>(ITEMS_DATA_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items data:', error);
      throw error;
    }
  }

  async getLocationsData(): Promise<Location[]> {
    try {
      const response = await axios.get<Location[]>(WORLD_DATA_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching locations data:', error);
      throw error;
    }
  }

  setServerRegion(region: keyof typeof API_BASE_URLS) {
    this.serverRegion = region;
  }

  getServerRegion(): keyof typeof API_BASE_URLS {
    return this.serverRegion;
  }
}

export const albionApi = new AlbionApiService();
export default AlbionApiService;
