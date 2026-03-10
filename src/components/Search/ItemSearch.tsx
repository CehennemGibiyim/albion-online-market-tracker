import React, { useState, useEffect } from 'react';
import { Search, Filter, X, Package } from 'lucide-react';
import { useItemSearch } from '../../hooks/useAlbionData';
import { Item, SearchFilters } from '../../types';

interface ItemSearchProps {
  onItemSelect: (item: Item) => void;
  selectedItems?: Item[];
  maxSelections?: number;
}

const ItemSearch: React.FC<ItemSearchProps> = ({ 
  onItemSelect, 
  selectedItems = [], 
  maxSelections = 5 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({ query: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { filteredItems, searchItems, searchLoading, itemsLoading } = useItemSearch();

  const categories = [
    'Armor', 'Weapon', 'Consumable', 'Resource', 'Tool', 
    'Mount', 'Furniture', 'Jewelry', 'Artifact', 'Magic'
  ];

  const tiers = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const newFilters: SearchFilters = {
      query: searchQuery,
      tier: selectedTier,
      category: selectedCategory,
    };
    setFilters(newFilters);
    searchItems(newFilters);
  }, [searchQuery, selectedTier, selectedCategory, searchItems]);

  const handleItemSelect = (item: Item) => {
    if (selectedItems.length >= maxSelections) {
      alert(`Maximum ${maxSelections} items can be selected`);
      return;
    }
    onItemSelect(item);
  };

  const removeSelectedItem = (itemToRemove: Item) => {
    const updatedItems = selectedItems.filter(item => item.UniqueName !== itemToRemove.UniqueName);
    onItemSelect(itemToRemove);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTier(undefined);
    setSelectedCategory(undefined);
  };

  const getItemDisplayName = (item: Item) => {
    return item.LocalizedNames['EN-US'] || item.LocalizedNames['EN'] || item.UniqueName;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name..."
            className="input-dark w-full pl-10 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-2 rounded-lg border transition-colors ${
            showFilters ? 'bg-albion-gold text-black' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {showFilters && (
        <div className="bg-albion-card border border-albion-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium">Filters</h3>
            <button
              onClick={clearFilters}
              className="text-albion-text-secondary hover:text-white text-sm"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-albion-text-secondary text-sm mb-2">Tier</label>
              <select
                value={selectedTier || ''}
                onChange={(e) => setSelectedTier(e.target.value ? Number(e.target.value) : undefined)}
                className="input-dark w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
              >
                <option value="">All Tiers</option>
                {tiers.map(tier => (
                  <option key={tier} value={tier}>T{tier}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-albion-text-secondary text-sm mb-2">Category</label>
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || undefined)}
                className="input-dark w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="bg-albion-card border border-albion-border rounded-lg p-3">
          <h3 className="text-white font-medium mb-2">Selected Items ({selectedItems.length}/{maxSelections})</h3>
          <div className="space-y-2">
            {selectedItems.map(item => (
              <div key={item.UniqueName} className="flex items-center justify-between bg-albion-darker rounded p-2">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-albion-gold" />
                  <span className="text-white text-sm">{getItemDisplayName(item)}</span>
                  <span className="text-albion-text-secondary text-xs">T{item.Tier}</span>
                </div>
                <button
                  onClick={() => removeSelectedItem(item)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(searchLoading || itemsLoading) ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-albion-gold border-t-transparent rounded-full"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {filteredItems.slice(0, 20).map(item => (
            <div
              key={item.UniqueName}
              onClick={() => handleItemSelect(item)}
              className="flex items-center justify-between p-3 bg-albion-card border border-albion-border rounded-lg cursor-pointer hover:bg-albion-darker transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-albion-darker rounded border border-albion-border flex items-center justify-center">
                  <Package className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{getItemDisplayName(item)}</p>
                  <p className="text-albion-text-secondary text-xs">
                    {item.ItemCategory} • T{item.Tier}
                  </p>
                </div>
              </div>
              <div className="text-albion-text-secondary text-xs">
                {item.UniqueName}
              </div>
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <div className="text-center py-8 text-albion-text-secondary">
          No items found matching your search criteria
        </div>
      ) : null}
    </div>
  );
};

export default ItemSearch;
