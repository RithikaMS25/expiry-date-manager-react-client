import { Calendar, Package, Tag, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const isExpiringSoon = () => {
    const today = new Date();
    const expiry = new Date(product.expiryDate);
    const diffTime = Math.abs(expiry - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays <= 7 && expiry > today;
  };

  const isExpired = () => {
    return new Date(product.expiryDate) < new Date();
  };

  const getStatusStyle = () => {
    if (isExpired()) return 'border-red-500 bg-red-50 text-red-700';
    if (isExpiringSoon()) return 'border-orange-500 bg-orange-50 text-orange-700';
    return 'border-teal-500 bg-teal-50 text-teal-700';
  };

  const getStatusText = () => {
    if (isExpired()) return 'Expired';
    if (isExpiringSoon()) return 'Expiring Soon';
    return 'Good';
  };

  const formattedDate = new Date(product.expiryDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusStyle()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link 
            to={`/edit-product/${product._id}`}
            className="p-1.5 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button 
            onClick={() => onDelete(product._id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={16} className="mr-2 text-gray-400" />
          <span>Expires: <span className="font-medium text-gray-900">{formattedDate}</span></span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Package size={16} className="mr-2 text-gray-400" />
          <span>Amount: <span className="font-medium text-gray-900">{product.amount}</span></span>
        </div>

        {product.upc && (
          <div className="flex items-center text-sm text-gray-600 mt-2 pt-2 border-t border-gray-50">
            <Tag size={16} className="mr-2 text-gray-400" />
            <span className="font-mono text-xs text-gray-500">{product.upc}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
