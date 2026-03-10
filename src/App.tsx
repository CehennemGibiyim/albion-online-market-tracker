import React, { useState } from 'react';
import Header from './components/Layout/Header';
import ItemSearch from './components/Search/ItemSearch';
import MarketCard from './components/Market/MarketCard';
import { useMarketData, useGoldPrices, useItemsData } from './hooks/useAlbionData';
import { Item, MarketOrder } from './types';
import { TrendingUp, DollarSign, Package, BarChart3, Activity } from 'lucide-react';

type ViewType = 'dashboard' | 'market' | 'gold' | 'settings';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: marketData, loading: marketLoading, error: marketError } = useMarketData(
    selectedItems.map(item => item.UniqueName),
    ['Caerleon', 'Bridgewatch', 'Lymhurst', 'Fort Sterling', 'Thetford'],
    [1, 2, 3, 4, 5]
  );

  const { data: goldData, loading: goldLoading } = useGoldPrices();
  const { data: items, loading: itemsLoading } = useItemsData();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleItemSelect = (item: Item) => {
    const existingIndex = selectedItems.findIndex(i => i.UniqueName === item.UniqueName);
    if (existingIndex >= 0) {
      setSelectedItems(selectedItems.filter(i => i.UniqueName !== item.UniqueName));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const getItemName = (itemId: string): string => {
    const item = items.find(i => i.UniqueName === itemId);
    if (!item) return itemId;
    return item.LocalizedNames['EN-US'] || item.LocalizedNames['EN'] || item.UniqueName;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-primary p-6 rounded-xl border border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Items Tracked</p>
              <p className="text-3xl font-bold text-white">{items.length.toLocaleString()}</p>
            </div>
            <Package className="w-8 h-8 text-blue-300" />
          </div>
        </div>

        <div className="bg-gradient-dark p-6 rounded-xl border border-albion-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-albion-text-secondary text-sm">Selected Items</p>
              <p className="text-3xl font-bold text-albion-gold">{selectedItems.length}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-albion-gold" />
          </div>
        </div>

        <div className="bg-gradient-dark p-6 rounded-xl border border-albion-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-albion-text-secondary text-sm">Gold Price (Latest)</p>
              <p className="text-3xl font-bold text-albion-gold">
                {goldData.length > 0 ? goldData[goldData.length - 1].price.toLocaleString() : 'N/A'}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-albion-gold" />
          </div>
        </div>
      </div>

      <div className="bg-albion-card border border-albion-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-albion-gold" />
          Market Overview
        </h2>
        
        {marketLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-albion-gold border-t-transparent rounded-full"></div>
          </div>
        ) : marketData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.slice(0, 6).map((order, index) => (
              <MarketCard
                key={`${order.item_id}-${order.location}-${index}`}
                order={order}
                itemName={getItemName(order.item_id)}
                onItemSelect={(itemId) => {
                  const item = items.find(i => i.UniqueName === itemId);
                  if (item) handleItemSelect(item);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-albion-text-secondary">
            Select items to view market data
          </div>
        )}
      </div>
    </div>
  );

  const renderMarket = () => (
    <div className="space-y-6">
      <div className="bg-albion-card border border-albion-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Package className="w-5 h-5 mr-2 text-albion-gold" />
          Item Search & Selection
        </h2>
        <ItemSearch
          onItemSelect={handleItemSelect}
          selectedItems={selectedItems}
          maxSelections={10}
        />
      </div>

      {selectedItems.length > 0 && (
        <div className="bg-albion-card border border-albion-border rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-albion-gold" />
            Market Data
          </h2>
          
          {marketLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-albion-gold border-t-transparent rounded-full"></div>
            </div>
          ) : marketError ? (
            <div className="text-center py-8 text-red-400">
              Error loading market data: {marketError}
            </div>
          ) : marketData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketData.map((order, index) => (
                <MarketCard
                  key={`${order.item_id}-${order.location}-${index}`}
                  order={order}
                  itemName={getItemName(order.item_id)}
                  onItemSelect={(itemId) => {
                    const item = items.find(i => i.UniqueName === itemId);
                    if (item) handleItemSelect(item);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-albion-text-secondary">
              No market data available for selected items
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderGold = () => (
    <div className="space-y-6">
      <div className="bg-albion-card border border-albion-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-albion-gold" />
          Gold Price History
        </h2>
        
        {goldLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-albion-gold border-t-transparent rounded-full"></div>
          </div>
        ) : goldData.length > 0 ? (
          <div className="space-y-4">
            <div className="bg-albion-darker rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-albion-text-secondary">Current Gold Price</span>
                <span className="text-2xl font-bold text-albion-gold">
                  {goldData[goldData.length - 1].price.toLocaleString()}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {goldData.slice(-10).reverse().map((gold, index) => (
                <div key={gold.timestamp} className="bg-albion-darker rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-albion-text-secondary text-sm">
                      {new Date(gold.timestamp * 1000).toLocaleDateString()}
                    </span>
                    <span className="text-white font-medium">
                      {gold.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-albion-text-secondary">
            No gold price data available
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-albion-card border border-albion-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Settings</h2>
        <div className="space-y-4">
          <div className="text-albion-text-secondary">
            Settings panel coming soon...
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'market':
        return renderMarket();
      case 'gold':
        return renderGold();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-albion-dark">
      <Header
        onSearch={handleSearch}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
