import { useState, useEffect, useCallback } from 'react';
import { albionApi } from '../services/api';
import { MarketOrder, GoldPrice, MarketHistory, Item, Location, SearchFilters } from '../types';

export const useMarketData = (itemIds: string[], locations?: string[], qualities?: number[]) => {
  const [data, setData] = useState<MarketOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await albionApi.getCurrentPrices(itemIds, locations, qualities);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setLoading(false);
    }
  }, [itemIds, locations, qualities]);

  useEffect(() => {
    if (itemIds.length > 0) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useGoldPrices = (startDate?: string, endDate?: string, count?: number) => {
  const [data, setData] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await albionApi.getGoldPrices(startDate, endDate, count);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gold prices');
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, count]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useMarketHistory = (
  itemIds: string[], 
  locations?: string[], 
  qualities?: number[], 
  timeScale: number = 24
) => {
  const [data, setData] = useState<MarketHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await albionApi.getMarketHistory(itemIds, locations, qualities, timeScale);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market history');
    } finally {
      setLoading(false);
    }
  }, [itemIds, locations, qualities, timeScale]);

  useEffect(() => {
    if (itemIds.length > 0) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useItemsData = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await albionApi.getItemsData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useLocationsData = () => {
  const [data, setData] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await albionApi.getLocationsData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch locations data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useItemSearch = () => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { data: items, loading: itemsLoading } = useItemsData();

  const searchItems = useCallback((filters: SearchFilters) => {
    setSearchLoading(true);
    
    let filtered = items;

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(item => 
        item.UniqueName.toLowerCase().includes(query) ||
        Object.values(item.LocalizedNames).some(name => 
          name.toLowerCase().includes(query)
        )
      );
    }

    if (filters.tier) {
      filtered = filtered.filter(item => item.Tier === filters.tier);
    }

    if (filters.category) {
      filtered = filtered.filter(item => item.ItemCategory === filters.category);
    }

    setFilteredItems(filtered);
    setSearchLoading(false);
  }, [items]);

  return { filteredItems, searchLoading, searchItems, itemsLoading };
};
