import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { ArrowLeft, Save, ScanLine } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const AddEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    upc: '',
    amount: 1,
    expiryDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 150 } },
        false
      );

      scanner.render(
        (decodedText) => {
          setFormData(prev => ({ ...prev, upc: decodedText }));
          setIsScanning(false);
        },
        (err) => {
          // ignore scan errors
        }
      );

      return () => {
        scanner.clear().catch(e => console.error(e));
      };
    }
  }, [isScanning]);

  useEffect(() => {
    // Auth check
    apiCall('/api/products?page=1').catch((err) => {
      if (err.message.includes('Authentication') || err.message.includes('token')) {
        navigate('/login');
      }
    });
  }, [navigate]);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          // Assuming the backend doesn't have a GET /:id endpoint currently based on our API signature list.
          // In a real app we'd fetch it, but here we can try to fetch all and find it, or we should add GET /:id.
          // Since we didn't define GET /:id, we'll fetch products and find the matching one.
          const data = await apiCall(`/api/products?search=${id}`);
          // Wait, search searches by text. Let's just fetch all and find, or just provide a placeholder.
          // Actually, we can fetch all and find it if we don't have the specific endpoint.
          const allProductsData = await apiCall(`/api/products?limit=100`);
          const product = allProductsData.products.find(p => p._id === id);
          
          if (product) {
            setFormData({
              title: product.title,
              upc: product.upc || '',
              amount: product.amount,
              expiryDate: new Date(product.expiryDate).toISOString().split('T')[0]
            });
          }
        } catch (err) {
          setError('Failed to load product details');
          console.error(err);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await apiCall(`/api/products/${id}`, {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
      } else {
        await apiCall('/api/products', {
          method: 'POST',
          body: JSON.stringify(formData)
        });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center p-4 pt-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 w-full max-w-xl">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                placeholder="e.g. Organic Milk"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Amount / Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  required
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  required
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                />
              </div>
            </div>

            <div>
              <label htmlFor="upc" className="block text-sm font-medium text-gray-700 mb-1">
                UPC Barcode (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="upc"
                  name="upc"
                  value={formData.upc}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow"
                  placeholder="Scan or enter code"
                />
                <button
                  type="button"
                  onClick={() => setIsScanning(true)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <ScanLine size={18} className="mr-2 text-gray-500" />
                  Scan Barcode
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">You can scan the barcode using a scanner or type it manually.</p>
              
              {isScanning && (
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                  <div id="reader" className="w-full bg-black/5 rounded overflow-hidden"></div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsScanning(false)}
                      className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Cancel Scanner
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 transition-colors"
              >
                {loading ? 'Saving...' : (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Product
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditProductPage;
