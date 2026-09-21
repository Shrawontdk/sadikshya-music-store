import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsApi } from '../api/products';
import { PRODUCTS as mockProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import SpecTable from '../components/products/SpecTable';
import { soundSampler } from '../utils/soundSampler';
import { 
  ShoppingBag, 
  Volume2, 
  CheckCircle2, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Award,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await productsApi.getById(id);
        if (isMounted && data) {
          setProduct(data);
          setSelectedImage(data.imageUrl || data.image || '');
        }
      } catch (err) {
        console.warn('Backend API detail not reachable, checking mock data:', err);
        // Fallback to mock product
        const fallback = mockProducts.find((p) => String(p.id) === String(id)) || mockProducts[0];
        if (isMounted) {
          setProduct(fallback);
          setSelectedImage(fallback.image || (fallback.gallery && fallback.gallery[0]) || '');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handlePlayTone = () => {
    if (!product) return;
    const cat = (product.categoryName || product.category || '').toLowerCase();
    let type = 'percussive';
    let freqs = [320, 110, 440];

    if (cat.includes('sarangi') || cat.includes('string') || cat.includes('guitar')) {
      type = 'string';
      freqs = [261.6, 392.0, 523.2];
    } else if (cat.includes('flute') || cat.includes('wind')) {
      type = 'wind';
      freqs = [440, 554.3, 659.2];
    } else if (cat.includes('bowl') || cat.includes('bell')) {
      type = 'singing_bowl';
      freqs = [528, 1056];
    }

    soundSampler.playFrequencies(freqs, 2.5, type);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#80182a] border-t-transparent"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-heritage font-bold text-[#80182a]">Instrument Not Found</h2>
        <p className="mt-2 text-[#624f4b]">The instrument you requested could not be located in our inventory.</p>
        <Link to="/browse" className="mt-6 inline-block px-6 py-2.5 bg-[#80182a] text-white rounded-full text-sm font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const formattedPrice = Number(product.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const defaultImage = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80';
  const mainImage = selectedImage || product.imageUrl || product.image || defaultImage;
  const gallery = product.gallery || (product.imageUrl ? [product.imageUrl] : [defaultImage]);

  // Construct dynamic details object if product has it or fallback specs
  const dynamicDetails = product.details || {
    "Origin": product.origin || "Patan Atelier, Lalitpur",
    "Master Artisan": product.artisan || "Guild Master Certified",
    "Acoustic Timber": product.timber || "Wild Mountain Acacia (Khayar)",
    "Membrane / Soundboard": product.membrane || "Hand-cured Parchment with Khari Masa",
    "Harmonic Resonance": product.tuning || "Concert Key Frequency Tuned",
    "Dimensions": product.dimensions || "Authentic Traditional Proportions",
    "Net Weight": product.weight || "3.2 kg"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#80182a] hover:text-[#c85a32] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to instruments</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery & Images */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-[#f9ede7] border border-[#d4a359]/40 shadow-lg">
            <img
              src={mainImage}
              alt={product.name || product.title}
              className="w-full h-full object-cover object-center"
            />

            {/* Sound audition overlay button */}
            <button
              onClick={handlePlayTone}
              className="absolute bottom-4 right-4 px-4 py-2.5 rounded-full bg-[#580d1b]/90 hover:bg-[#80182a] text-[#f4e5c4] font-semibold text-xs transition-all shadow-lg flex items-center gap-2 backdrop-blur-xs active:scale-95 border border-[#d4a359]/30"
            >
              <Volume2 className="w-4 h-4 text-[#d4a359]" />
              <span>Listen to Acoustic Sample</span>
            </button>
          </div>

          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    mainImage === imgUrl ? 'border-[#80182a] ring-2 ring-[#80182a]/30' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Provenance Box */}
          <div className="p-5 rounded-2xl bg-[#f9ede7] border border-[#d4a359]/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#80182a] uppercase tracking-wider">
              <Award className="w-4 h-4 text-[#c85a32]" />
              <span>Artisan Provenance Certificate</span>
            </div>
            <p className="text-xs text-[#624f4b] leading-relaxed">
              Every instrument undergoes rigorous frequency testing and acoustic tuning before being sealed in our Lalitpur atelier. Includes certified guild documentation and climate preservation instructions.
            </p>
          </div>
        </div>

        {/* Right: Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[#80182a]/10 text-[#80182a] text-xs font-bold uppercase rounded-full tracking-wider">
                {product.categoryName || product.category || 'Handcrafted Instrument'}
              </span>
              {product.badge && (
                <span className="px-3 py-1 bg-[#d4a359]/20 text-[#80182a] text-xs font-bold rounded-full">
                  {product.badge}
                </span>
              )}
            </div>

            <h1 className="font-heritage text-3xl sm:text-4xl font-bold text-[#1f1412]">
              {product.name || product.title}
            </h1>

            {product.subtitle && (
              <p className="text-sm font-medium text-[#c85a32] mt-1">
                {product.subtitle}
              </p>
            )}

            <div className="mt-4 flex items-baseline gap-4">
              <span className="font-heritage text-3xl font-bold text-[#80182a]">
                {formattedPrice}
              </span>
              {product.localPrice && (
                <span className="text-sm text-[#624f4b]">
                  ({product.localPrice})
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-[#624f4b] leading-relaxed">
            {product.description}
          </p>

          {/* Stock status */}
          <div className="flex items-center gap-2 text-sm font-medium">
            {product.stock === undefined || product.stock > 0 ? (
              <span className="text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                In Stock & Ready for Dispatch ({product.stock ?? 5} units available)
              </span>
            ) : (
              <span className="text-rose-700">Currently out of stock (Available on custom backorder)</span>
            )}
          </div>

          {/* Purchase Controls */}
          <div className="p-6 rounded-2xl bg-white border border-[#d4a359]/30 shadow-xs space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase text-[#624f4b]">Quantity</label>
              <div className="flex items-center border border-[#d4a359]/40 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-[#f9ede7] text-[#1f1412] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm font-bold text-[#1f1412]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 hover:bg-[#f9ede7] text-[#1f1412] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#80182a] to-[#c85a32] text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Cart</span>
              </button>

              <button
                onClick={() => {
                  addItem(product, quantity);
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
                className="w-full py-3.5 px-6 rounded-xl border-2 border-[#80182a] text-[#80182a] hover:bg-[#80182a] hover:text-white font-bold text-sm transition-all active:scale-95 disabled:opacity-50"
              >
                Buy Now
              </button>
            </div>

            {addedNotice && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between animate-fade-in border border-emerald-200">
                <span>Added {quantity} unit(s) to your cart!</span>
                <Link to="/cart" className="underline font-bold">Go to Cart</Link>
              </div>
            )}
          </div>

          {/* Dynamic Details Spec Table */}
          <div className="pt-4">
            <SpecTable details={dynamicDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}
