import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingBag, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Music, 
  PackageCheck,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#d4a359]/30 shadow-xs">
      {/* Top Heritage Notice Bar */}
      <div className="bg-[#580d1b] text-[#f4e5c4] px-4 py-1.5 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] animate-ping"></span>
        <span>Himalayan Craftsmanship & Master Western Instruments • Handcrafted in Nepal</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#80182a] to-[#c85a32] p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-[10px] bg-[#580d1b] flex items-center justify-center text-[#d4a359]">
                <Music className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-heritage text-xl md:text-2xl font-bold tracking-tight text-[#80182a]">
                  Sadikshya
                </span>
                <span className="text-xs font-semibold tracking-widest text-[#c85a32] uppercase">
                  Music Store
                </span>
              </div>
              <p className="text-[10px] text-[#624f4b] font-medium tracking-wider hidden sm:block">
                Authentic Nepali & Western Melodies
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Madal, Sarangi, Guitars, Strings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#f9ede7] border border-[#d4a359]/40 rounded-full focus:outline-hidden focus:border-[#80182a] focus:ring-2 focus:ring-[#80182a]/20 transition-all text-[#1f1412] placeholder-[#624f4b]/60"
              />
              <Search className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#1f1412]">
            <Link 
              to="/" 
              className={`transition-colors hover:text-[#80182a] ${location.pathname === '/' ? 'text-[#80182a] font-semibold' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/browse" 
              className={`transition-colors hover:text-[#80182a] ${location.pathname === '/browse' ? 'text-[#80182a] font-semibold' : ''}`}
            >
              Instruments
            </Link>
            <Link 
              to="/browse?category=traditional" 
              className="text-[#c85a32] hover:text-[#80182a] transition-colors flex items-center gap-1"
            >
              <span>Nepali Heritage</span>
            </Link>

            {/* Admin Dashboard link if user is Admin */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className="px-3 py-1 bg-[#80182a]/10 text-[#80182a] border border-[#80182a]/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-[#80182a] hover:text-white transition-all shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Action Buttons: Cart & Auth */}
          <div className="flex items-center gap-4">
            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2.5 text-[#1f1412] hover:text-[#80182a] hover:bg-[#f2ded5]/50 rounded-full transition-colors flex items-center"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#80182a]" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#c85a32] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* User Dropdown / Auth Links */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border border-[#d4a359]/50 bg-[#f9ede7] hover:bg-[#f2ded5] transition-colors text-xs font-medium text-[#1f1412]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#80182a] text-[#f4e5c4] flex items-center justify-center font-bold text-xs uppercase">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="max-w-[100px] truncate hidden sm:inline">{user?.fullName?.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#624f4b]" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#d4a359]/30 py-2 z-50 divide-y divide-gray-100"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2">
                      <p className="text-xs font-bold text-[#1f1412] truncate">{user?.fullName}</p>
                      <p className="text-[11px] text-[#624f4b] truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[#f9ede7] text-[#80182a]">
                        {user?.role}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/my-orders"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-[#1f1412] hover:bg-[#f9ede7] transition-colors"
                      >
                        <PackageCheck className="w-4 h-4 text-[#c85a32]" />
                        My Order History
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-[#80182a] font-semibold hover:bg-[#80182a]/10 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#80182a] hover:text-[#580d1b] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#80182a] hover:bg-[#580d1b] text-white rounded-full transition-all shadow-xs hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1f1412] hover:text-[#80182a] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#d4a359]/30 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#f9ede7] border border-[#d4a359]/40 rounded-full focus:outline-hidden text-[#1f1412]"
              />
              <Search className="w-4 h-4 text-[#624f4b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col space-y-2 text-sm font-medium">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#f9ede7] text-[#1f1412]"
              >
                Home
              </Link>
              <Link 
                to="/browse" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#f9ede7] text-[#1f1412]"
              >
                All Instruments
              </Link>
              <Link 
                to="/cart" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#f9ede7] text-[#1f1412] flex items-center justify-between"
              >
                <span>Shopping Cart</span>
                {totalCount > 0 && (
                  <span className="bg-[#c85a32] text-white px-2 py-0.5 rounded-full text-xs font-bold">
                    {totalCount}
                  </span>
                )}
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/my-orders" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg hover:bg-[#f9ede7] text-[#1f1412]"
                >
                  My Orders
                </Link>
              )}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg bg-[#80182a]/10 text-[#80182a] font-semibold flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
