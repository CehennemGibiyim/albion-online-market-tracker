import React from 'react';
import { TrendingUp, TrendingDown, Minus, Package } from 'lucide-react';
import { MarketOrder } from '../../types';

interface MarketCardProps {
  order: MarketOrder;
  itemName: string;
  itemIcon?: string;
  onItemSelect?: (itemId: string) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ order, itemName, itemIcon, onItemSelect }) => {
  const getPriceChangeIcon = () => {
    if (!order.sell_price_min_date || !order.sell_price_max_date) {
      return <Minus className="w-4 h-4 text-gray-400" />;
    }
    
    const minDate = new Date(order.sell_price_min_date);
    const maxDate = new Date(order.sell_price_max_date);
    
    if (maxDate > minDate && order.sell_price_max && order.sell_price_min) {
      return order.sell_price_max > order.sell_price_min ? 
        <TrendingUp className="w-4 h-4 text-green-400" /> : 
        <TrendingDown className="w-4 h-4 text-red-400" />;
    }
    
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A';
    return price.toLocaleString();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div 
      className="card-hover bg-albion-card border border-albion-border rounded-lg p-4 cursor-pointer"
      onClick={() => onItemSelect?.(order.item_id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {itemIcon ? (
            <img 
              src={itemIcon} 
              alt={itemName}
              className="w-12 h-12 rounded border border-albion-border"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/48/48';
              }}
            />
          ) : (
            <div className="w-12 h-12 bg-albion-darker rounded border border-albion-border flex items-center justify-center">
              <Package className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
              {itemName}
            </h3>
            <p className="text-albion-text-secondary text-xs">
              {order.location} • Quality {order.quality}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-1">
            {getPriceChangeIcon()}
            <span className="text-albion-gold font-bold">
              {formatPrice(order.sell_price_min)}
            </span>
          </div>
          <p className="text-xs text-albion-text-secondary mt-1">
            Min Price
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-albion-border grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-albion-text-secondary">Buy Price</p>
          <p className="text-white font-medium">
            {formatPrice(order.buy_price_min)}
          </p>
        </div>
        <div>
          <p className="text-albion-text-secondary">Sell Price (Max)</p>
          <p className="text-white font-medium">
            {formatPrice(order.sell_price_max)}
          </p>
        </div>
      </div>

      {(order.sell_price_min_date || order.sell_price_max_date) && (
        <div className="mt-2 text-xs text-albion-text-secondary">
          Last updated: {formatDate(order.sell_price_max_date || order.sell_price_min_date)}
        </div>
      )}
    </div>
  );
};

export default MarketCard;
