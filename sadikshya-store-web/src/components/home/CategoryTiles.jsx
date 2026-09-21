import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Disc, Guitar, Radio, Flame, Sparkles } from 'lucide-react';

const CATEGORY_DATA = [
  {
    id: 'madal',
    title: 'Madal (मादल)',
    nepali: 'नेपाली ताल बाजा',
    subtitle: 'Concert pitch folk percussion hewn from Saaj hardwood',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    count: '6 Variations'
  },
  {
    id: 'sarangi',
    title: 'Sarangi (सारङ्गी)',
    nepali: 'गन्धर्व परम्परा',
    subtitle: 'Bowed 4-string heirloom carved from single Acacia blocks',
    image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=600&q=80',
    count: '4 Variations'
  },
  {
    id: 'dhime',
    title: 'Dhime & Percussion (धिमे)',
    nepali: 'नेवार जात्रा बाजा',
    subtitle: 'Resonant ceremonial drums of Bhaktapur & Patan festivals',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    count: '5 Variations'
  },
  {
    id: 'dhamphu',
    title: 'Dhamphu & Tungna (डम्फु)',
    nepali: 'तामाङ सेलो ताल',
    subtitle: 'Sacred frame drums with bird crests and plucked folk lutes',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80',
    count: '3 Variations'
  },
  {
    id: 'guitars',
    title: 'Guitars & Basses',
    nepali: 'पाश्चात्य गितार',
    subtitle: 'Solid spruce acoustic, classical, and electric guitars',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=600&q=80',
    count: '12 Variations'
  },
  {
    id: 'keyboards',
    title: 'Keyboards & Synths',
    nepali: 'डिजिटल पियानो',
    subtitle: 'Weighted-key stage pianos and dynamic synthesizers',
    image: 'https://images.unsplash.com/photo-1520523839898-50712825e617?auto=format&fit=crop&w=600&q=80',
    count: '8 Variations'
  }
];

export default function CategoryTiles({ categories = [] }) {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#80182a]/10 text-[#80182a] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#c85a32]" />
          <span>Atelier Collections</span>
        </div>
        <h2 className="font-heritage text-3xl sm:text-4xl font-bold text-[#80182a]">
          Instruments of Culture & Precision
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#624f4b]">
          From devotional Himalayan temples to modern recording studios, discover instruments crafted for soulful expression.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORY_DATA.map((cat) => (
          <Link
            key={cat.id}
            to={`/browse?category=${cat.id}`}
            className="group relative h-80 rounded-2xl overflow-hidden border border-[#d4a359]/30 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-6"
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                 style={{ backgroundImage: `url(${cat.image})` }}>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1412] via-[#1f1412]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-[#80182a]/20 group-hover:bg-[#80182a]/40 transition-colors"></div>

            {/* Content */}
            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#d4a359] uppercase tracking-wider">
                  {cat.nepali}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs font-medium">
                  {cat.count}
                </span>
              </div>

              <h3 className="font-heritage text-xl font-bold text-white group-hover:text-[#f4e5c4] transition-colors">
                {cat.title}
              </h3>

              <p className="text-xs text-white/80 line-clamp-2">
                {cat.subtitle}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center text-xs font-semibold text-[#d4a359] group-hover:underline">
                  Browse Collection →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
