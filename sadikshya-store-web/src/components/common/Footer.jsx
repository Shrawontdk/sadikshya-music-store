import React from 'react';
import { Link } from 'react-router-dom';
import { Music, MapPin, Phone, Mail, Award, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#580d1b] text-[#fff8f5] border-t-2 border-[#d4a359]/40 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4a359] text-[#580d1b] flex items-center justify-center font-bold">
                <Music className="w-5 h-5" />
              </div>
              <span className="font-heritage text-xl font-bold tracking-tight text-[#f4e5c4]">
                Sadikshya Music Store
              </span>
            </div>
            <p className="text-sm text-[#f4e5c4]/80 leading-relaxed">
              Curating authentic handcrafted Nepali folk instruments from master artisans across Patan, Bhaktapur, and Batulechaur, alongside select professional Western musical gear.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#d4a359] font-medium">
              <Award className="w-4 h-4" />
              <span>Certified Guild Masterworks & Luthier Tested</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-heritage text-[#f4e5c4] text-base font-semibold mb-4 tracking-wider">
              Traditional Nepali
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fff8f5]/80">
              <li>
                <Link to="/browse?category=madal" className="hover:text-[#d4a359] transition-colors">
                  Patan Master Madals
                </Link>
              </li>
              <li>
                <Link to="/browse?category=sarangi" className="hover:text-[#d4a359] transition-colors">
                  Gandharva Sarangis
                </Link>
              </li>
              <li>
                <Link to="/browse?category=dhime" className="hover:text-[#d4a359] transition-colors">
                  Bhaktapur Dhime Drums
                </Link>
              </li>
              <li>
                <Link to="/browse?category=dhamphu" className="hover:text-[#d4a359] transition-colors">
                  Tamang Dhamphus
                </Link>
              </li>
              <li>
                <Link to="/browse?category=murchunga" className="hover:text-[#d4a359] transition-colors">
                  Hand-forged Murchungas
                </Link>
              </li>
            </ul>
          </div>

          {/* Western Gear */}
          <div>
            <h4 className="font-heritage text-[#f4e5c4] text-base font-semibold mb-4 tracking-wider">
              Western Instruments
            </h4>
            <ul className="space-y-2.5 text-sm text-[#fff8f5]/80">
              <li>
                <Link to="/browse?category=guitars" className="hover:text-[#d4a359] transition-colors">
                  Acoustic & Classical Guitars
                </Link>
              </li>
              <li>
                <Link to="/browse?category=keyboards" className="hover:text-[#d4a359] transition-colors">
                  Digital Pianos & Keyboards
                </Link>
              </li>
              <li>
                <Link to="/browse?category=strings" className="hover:text-[#d4a359] transition-colors">
                  High-Tension Strings & Accessories
                </Link>
              </li>
              <li>
                <Link to="/browse?category=percussion" className="hover:text-[#d4a359] transition-colors">
                  Fusion & Folk Percussion
                </Link>
              </li>
            </ul>
          </div>

          {/* Store Location & Hours */}
          <div className="space-y-3">
            <h4 className="font-heritage text-[#f4e5c4] text-base font-semibold mb-4 tracking-wider">
              Visit Our Atelier
            </h4>
            <div className="flex items-start gap-3 text-sm text-[#fff8f5]/80">
              <MapPin className="w-5 h-5 text-[#d4a359] shrink-0 mt-0.5" />
              <span>Patan Dhoka Heritage Lane, Lalitpur, Kathmandu Valley, Nepal</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#fff8f5]/80">
              <Phone className="w-4 h-4 text-[#d4a359] shrink-0" />
              <span>+977 1 552-3841 / 9841-392011</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#fff8f5]/80">
              <Mail className="w-4 h-4 text-[#d4a359] shrink-0" />
              <span>info@sadikshyamusic.com.np</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#d4a359]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#f4e5c4]/60 gap-4">
          <p>© {new Date().getFullYear()} Sadikshya Music Store. Dedicated to preserving Himalayan musical traditions.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-[#c85a32] fill-current" /> in Nepal
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4a359]" /> Secure ASP.NET Core API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
