"use client";
import { useState } from 'react';
import { Calendar, Users, MapPin, ArrowRight, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    travelerType: 'Solo',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push(`/results?dest=${formData.destination}&type=${formData.travelerType}`);
  };

  return (
    // 1. Background Image with Dark Overlay
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}
      >
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-sm font-medium mb-4 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>AI-Powered Travel Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
            Don't just ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">Where</span>.<br />
            Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">When</span>.
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Our AI analyzes weather patterns, crowd density, and price trends to predict the 
            <strong> perfect window</strong> for your next trip.
          </p>
        </div>

        {/* 2. Glassmorphism Search Interface */}
        <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 md:p-8 animate-fade-in-up delay-100">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            
            {/* Destination Input */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium text-blue-100 ml-1">Destination</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ex: Kyoto, Japan"
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:bg-black/40 outline-none transition text-white placeholder-white/40 font-medium"
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium text-blue-100 ml-1">Dates (Optional)</label>
              <div className="relative group">
                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ex: Late October"
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:bg-black/40 outline-none transition text-white placeholder-white/40 font-medium"
                  value={formData.dates}
                  onChange={(e) => setFormData({...formData, dates: e.target.value})}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Traveler Type Selector */}
            <div className="md:col-span-1 space-y-2">
              <label className="text-sm font-medium text-blue-100 ml-1">Traveler Type</label>
              <div className="relative group">
                <Users className="absolute left-4 top-3.5 w-5 h-5 text-blue-200 group-focus-within:text-white transition-colors" />
                <select 
                  className="w-full pl-12 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-400/50 focus:bg-black/40 outline-none transition appearance-none text-white font-medium cursor-pointer"
                  value={formData.travelerType}
                  onChange={(e) => setFormData({...formData, travelerType: e.target.value})}
                  disabled={isLoading}
                >
                  <option value="Solo" className="bg-slate-800">Solo Explorer</option>
                  <option value="Couple" className="bg-slate-800">Couple</option>
                  <option value="Family" className="bg-slate-800">Family w/ Kids</option>
                  <option value="Friends" className="bg-slate-800">Friend Group</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <div className="md:col-span-1">
              <button 
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg
                  ${isLoading 
                    ? 'bg-blue-600/50 cursor-not-allowed text-blue-200' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white hover:scale-[1.02] active:scale-[0.98]'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> 
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Analyze Trip</span> 
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* 3. Trending/Suggestions Section */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center gap-4 text-sm text-blue-100/80">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">Trending Now:</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {['Bali in May', 'Iceland in Sept', 'Kyoto in Nov', 'Goa in Dec'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setFormData({...formData, destination: tag.split(' in ')[0], dates: tag.split(' in ')[1]})}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors whitespace-nowrap"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}