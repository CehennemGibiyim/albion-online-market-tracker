export interface Item {
  UniqueName: string;
  Index: number;
  LocalizedNames: Record<string, string>;
  Description: Record<string, string>;
  ItemCategory: string;
  ItemSubCategory: string;
  Tier: number;
  EnchantmentLevel: number;
  Icon: string;
}

export interface Location {
  Id: string;
  Name: string;
  DisplayName: string;
  Type: string;
  Safe: boolean;
  AllianceTerritory?: boolean;
}

export interface MarketOrder {
  item_id: string;
  location: string;
  quality: number;
  sell_price_min?: number;
  sell_price_max?: number;
  sell_price_min_date?: string;
  sell_price_max_date?: string;
  buy_price_min?: number;
  buy_price_max?: number;
  buy_price_min_date?: string;
  buy_price_max_date?: string;
}

export interface GoldPrice {
  timestamp: number;
  price: number;
  server: string;
}

export interface MarketHistory {
  item_id: string;
  location: string;
  quality: number;
  timestamp: number;
  data: {
    sell_price_avg?: number;
    buy_price_avg?: number;
    sell_volume?: number;
    buy_volume?: number;
  };
}

export interface ApiResponse<T> {
  data: T[];
  timestamp: string;
  server: string;
}

export interface SearchFilters {
  query: string;
  tier?: number;
  category?: string;
  locations?: string[];
  qualities?: number[];
  minPrice?: number;
  maxPrice?: number;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  volume?: number;
}

export interface MarketStats {
  currentPrice: number;
  priceChange24h: number;
  volume24h: number;
  avgPrice7d: number;
  minPrice7d: number;
  maxPrice7d: number;
}
