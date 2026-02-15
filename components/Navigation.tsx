
import React, { useState } from 'react';
import { PageId } from '../types';
import { SCHOOL_INFO } from '../constants';

interface NavigationProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: { label: string; id: PageId; color: string; icon: string }[] = [
    { label: 'Home', id: 'home', color: 'kids-blue', icon: '🏠' },
    { label: 'About', id: 'about', color: 'kids-pink', icon: '📖' },
    { label: 'Academics', id: 'academics', color: 'kids-teal', icon: '✏️' },
    { label: 'Facilities', id: 'facilities', color: 'kids-green', icon: '🏫' },
    { label: 'Activities', id: 'activities', color: 'kids-yellow', icon: '⚽' },
    { label: 'Gallery', id: 'gallery', color: 'kids-purple', icon: '🖼️' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300">
      <div className="bg-white/80 backdrop-blur-xl shadow-kids-xl border-b-4 border-kids-yellow">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Compact Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center group cursor-pointer relative py-1"
          >
            <div className="absolute -top-2 -left-2 w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl flex items-center justify-center shadow-kids-xl overflow-hidden border-2 border-kids-pink z-10 transition-transform group-hover:scale-110 group-hover:rotate-3">
              <img src="https://picsum.photos/200/200?random=logo" alt="Logo" className="w-full h-full object-cover" />
            </div>
            
            <div className="ml-20 md:ml-24">
              <h1 className="text-lg md:text-2xl font-display font-bold text-kids-dark leading-none group-hover:text-kids-pink transition">
                {SCHOOL_INFO.name}
              </h1>
              <p className="text-[8px] md:text-[10px] font-black text-kids-green uppercase tracking-widest mt-0.5">
                Meerut's Premier Primary Hub
              </p>
            </div>
          </div>

          {/* Desktop Menu - Balanced Sizes */}
          <div className="hidden xl:flex space-x-1 font-bold text-gray-700 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all hover:bg-${item.color}/10 ${activePage === item.id ? `bg-${item.color}/20 text-kids-dark ring-2 ring-${item.color}/30` : 'hover:scale-105'}`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-lg font-display font-bold tracking-tight">{item.label}</span>
              </button>
            ))}
            
            <div className="h-6 w-[1px] bg-gray-200 mx-3"></div>
            
            <button 
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 bg-kids-yellow text-kids-dark rounded-xl shadow-fun hover:shadow-fun-hover hover:translate-x-0.5 hover:translate-y-0.5 transition-all border-2 border-kids-dark font-display font-bold uppercase tracking-wider text-base"
            >
              Admissions 🚀
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="xl:hidden bg-kids-blue/10 p-2 rounded-xl text-kids-blue text-xl"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-b-8 border-kids-blue p-4 shadow-2xl animate-pop-in rounded-b-[2rem]">
          <div className="grid grid-cols-2 gap-3 font-bold text-center">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-colors ${activePage === item.id ? 'bg-kids-blue/10 text-kids-blue' : 'bg-gray-50 text-gray-700'}`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base font-display uppercase tracking-widest">{item.label}</span>
              </button>
            ))}
            <button 
              onClick={() => handleNavClick('contact')}
              className="col-span-2 bg-kids-pink text-white py-3.5 rounded-2xl shadow-fun font-display font-bold text-xl"
            >
              Apply Now 🎒
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
