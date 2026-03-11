"use client";
import { ArrowLeft, CheckCircle, AlertTriangle, Thermometer, Users, DollarSign, Map, ShieldCheck, Briefcase, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const destination = searchParams.get('dest') || "Destination";
  const travelerType = searchParams.get('type') || "Traveler";
  const dates = searchParams.get('dates') || "Upcoming Trip"; // Get dates from URL too

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ destination, dates, travelerType }),
        });

        if (!response.ok) throw new Error("Failed to fetch");
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("The AI is overloaded or network failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (destination) {
      fetchAnalysis();
    }
  }, [destination, dates, travelerType]);

  // --- LOADING STATE (Beautiful Spinner) ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <h2 className="text-2xl font-bold mb-2">Consulting Gemini AI...</h2>
        <p className="text-slate-400">Analyzing weather patterns, crowd density, and prices for {destination}.</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-900 mb-2">Analysis Failed</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Try Again
        </Link>
      </div>
    );
  }

  // --- SUCCESS STATE (The Beautiful Dashboard) ---
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Hero Header */}
      <div className="bg-slate-900 text-white pb-20 pt-10 px-4 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Back to Search
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className={`font-bold tracking-wider text-sm mb-2 uppercase flex items-center gap-2 ${data.score > 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                {data.score > 70 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                {data.verdict}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                Visit {destination}
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                {data.summary}
              </p>
            </div>
            
            {/* Score Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-right">
                <div className="text-xs text-slate-300 uppercase font-bold">Suitability Score</div>
                <div className="text-3xl font-bold text-white">{data.score}/100</div>
              </div>
              <div className={`h-16 w-16 rounded-full border-4 flex items-center justify-center bg-slate-900 text-xl shadow-lg ${data.score > 70 ? 'border-emerald-500 text-emerald-500' : 'border-yellow-500 text-yellow-500'}`}>
                <span className="font-bold">{data.score > 80 ? 'A' : data.score > 60 ? 'B' : 'C'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 pb-20">
        
        {/* 2. Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full mb-3"><Thermometer className="w-6 h-6" /></div>
            <div className="text-slate-500 text-sm font-semibold uppercase">Weather</div>
            <div className="text-xl font-bold text-slate-900">{data.metrics?.weather || "N/A"}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full mb-3"><Users className="w-6 h-6" /></div>
            <div className="text-slate-500 text-sm font-semibold uppercase">Crowd Level</div>
            <div className="text-xl font-bold text-purple-700">{data.metrics?.crowd || "N/A"}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center hover:transform hover:-translate-y-1 transition duration-300">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-3"><DollarSign className="w-6 h-6" /></div>
            <div className="text-slate-500 text-sm font-semibold uppercase">Cost</div>
            <div className="text-xl font-bold text-slate-900">{data.metrics?.cost || "N/A"}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. Deep Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-600" />
                AI Analysis: Why this works
              </h2>
              <div className="space-y-4">
                {data.reasoning?.map((reason: string, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{index + 1}</div>
                    <p className="text-slate-600 leading-relaxed text-sm mt-1">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Packing List (Static for Demo, or you can ask Gemini to generate this too!) */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-slate-500" />
                Smart Packing List (AI Suggested)
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Power Bank", "Comfortable Shoes", "Layered Clothing", "Universal Adapter"].map(item => (
                  <span key={item} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium border border-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> AI Confidence
              </h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                    High
                  </span>
                  <span className="text-xs font-semibold inline-block text-emerald-600">
                    98%
                  </span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                  <div style={{ width: "98%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"></div>
                </div>
              </div>
            </div>

            {/* Alternative Option */}
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <h3 className="text-lg font-bold mb-1 relative z-10">Better Alternative?</h3>
              <div className="text-2xl font-bold mb-4 relative z-10">{data.alternateDates}</div>
              <button className="w-full py-2.5 bg-white text-indigo-700 hover:bg-indigo-50 rounded-lg text-sm font-bold transition shadow-md relative z-10">
                View Comparison
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function Results() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}