import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- ICONS ---
const CleanlinessIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const EconomyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const CorruptionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c.511 0 1.022.024 1.526.071" /></svg>;
const ResourcesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>;

const missionData = [
  {
    icon: <CleanlinessIcon />,
    complaint: '“Government never cleans the roads.”',
    mirror: '“You litter daily.”',
    contribution: '“Use dustbins, join clean-up drives.”',
    impact: 'Cleaner cities, lower municipal costs.',
  },
  {
    icon: <EconomyIcon />,
    complaint: '“India depends too much on imports.”',
    mirror: '“You prefer foreign goods.”',
    contribution: '“Buy Indian-made products, support local artisans.”',
    impact: 'Boosts MSMEs, increases jobs, strengthens the Rupee.',
  },
  {
    icon: <CorruptionIcon />,
    complaint: '“Nothing gets done without a bribe.”',
    mirror: '“You pay \'speed money\' to bend rules.”',
    contribution: '“Refuse to bribe, use digital payments, report corruption.”',
    impact: 'Increases transparency, saves trillions, improves governance.',
  },
  {
    icon: <ResourcesIcon />,
    complaint: '“There’s no water in the taps.”',
    mirror: '“You ignore leaking taps and waste water.”',
    contribution: '“Fix leaks immediately, conserve water, report wastage.”',
    impact: 'Preserves critical resources, reduces drought impact.',
  }
];

const chartData = [
  { name: 'Energy Saving', GDP_Impact: 4000, fill: '#000080' },
  { name: 'Clean Cities', GDP_Impact: 3000, fill: '#138808' },
  { name: 'Buy Indian', GDP_Impact: 5000, fill: '#FF9933' },
  { name: 'No Bribes', GDP_Impact: 6000, fill: '#ef4444' },
  { name: 'Skill Learning', GDP_Impact: 2000, fill: '#6366f1' },
];

const microImpactData = [
  { icon: '💡', action: 'Turning off unused lights', saving: 200, multiplied: 20000000000 },
  { icon: '🗑️', action: 'Avoiding litter (less cleaning cost)', saving: 500, multiplied: 50000000000 },
  { icon: '🚫', action: 'Avoiding corruption in small docs', saving: 1000, multiplied: 100000000000 },
  { icon: '🇮🇳', action: 'Buying local products', saving: 2000, multiplied: 200000000000 },
];

const animate = (from, to, options) => {
    const { duration = 2000, onUpdate } = options;
    let start = null;
    let animationFrame;
    const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        if (onUpdate) {
            onUpdate(from + (to - from) * progress);
        }
        if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
        }
    };
    animationFrame = requestAnimationFrame(step);
    return { stop: () => cancelAnimationFrame(animationFrame) };
};

const InteractiveMissionCard: React.FC<{ data: typeof missionData[0] }> = ({ data }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <div className="w-full h-96 [perspective:1000px]" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full text-center transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full bg-white rounded-lg shadow-xl p-6 flex flex-col justify-center items-center cursor-pointer [backface-visibility:hidden]">
                    {data.icon}
                    <h3 className="font-bold text-lg text-slate-500 mt-4">The Complaint</h3>
                    <p className="text-2xl italic text-slate-800">{data.complaint}</p>
                    <div className="mt-6 text-sm font-bold text-yr-saffron">Click to see YouR Role →</div>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-slate-50 rounded-lg shadow-xl p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                     <div className="text-left">
                        <h3 className="font-bold text-lg text-slate-500">The Mirror:</h3>
                        <p className="text-2xl italic text-slate-800">{data.mirror}</p>
                    </div>
                     <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-md text-left">
                        <h3 className="font-bold text-lg text-green-700">The Contribution (YouR Role):</h3>
                        <p className="text-2xl font-semibold text-green-800">{data.contribution}</p>
                    </div>
                    <div className="text-sm font-bold text-yr-saffron text-center">Click to flip back ←</div>
                </div>
            </div>
        </div>
    );
};

// A simple useInView hook with IntersectionObserver
const useInView = (ref, options) => {
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return inView;
};

const AnimatedNumber = ({ value }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            const controls = animate(0, value, {
                duration: 2000,
                onUpdate(latest) {
                    setCount(latest);
                }
            });
            return () => controls.stop();
        }
    }, [inView, value]);

    const formatNumber = (num) => {
        if (num >= 10000000) {
            return `₹${(num / 10000000).toFixed(2)} Crore`;
        }
        return `₹${Math.round(num).toLocaleString('en-IN')}`;
    }

    return <span ref={ref}>{formatNumber(count)}</span>;
};

// FIX: Add explicit types for the component props.
const MicroImpactVisualizer: React.FC<{ item: typeof microImpactData[0] }> = ({ item }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className={`transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row items-center justify-between hover:shadow-xl transition-shadow gap-4">
                <div className="flex items-center space-x-4 w-full md:w-1/3">
                    <span className="text-4xl">{item.icon}</span>
                    <p className="text-slate-700 text-lg flex-1">{item.action}</p>
                </div>
                <div className="flex items-center space-x-4 text-center w-full md:w-auto">
                    <div className="bg-slate-100 p-2 rounded-md">
                        <p className="font-bold text-slate-800 text-xl">₹{item.saving.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-slate-500">per person/year</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 text-center w-full md:w-auto">
                    <span className="text-3xl font-bold text-slate-400 animate-pulse">×</span>
                    <div className="p-2">
                        <p className="font-bold text-yr-blue text-xl">1 Crore</p>
                        <p className="text-xs text-slate-500">citizens</p>
                    </div>
                    <span className="text-3xl font-bold text-slate-400">=</span>
                </div>
                <div className="bg-green-100 p-3 rounded-md text-center w-full md:w-auto">
                    <p className="font-bold text-yr-green text-3xl">
                        {inView ? <AnimatedNumber value={item.multiplied} /> : '₹0'}
                    </p>
                    <p className="text-xs text-green-700">National Impact</p>
                </div>
            </div>
        </div>
    );
};


const MissionAndImpactPage: React.FC = () => {
  return (
    <div>
      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bebas text-yr-blue">From Complaint to Contribution</h1>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Our mission is to shift the national mindset. Instead of pointing fingers, we must look in the mirror and recognize the power we hold to build a better India.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {missionData.map((item, index) => (
              <InteractiveMissionCard key={index} data={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Transition/Bridge Section */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="bg-yr-blue text-white p-8 rounded-lg shadow-2xl max-w-4xl mx-auto text-center">
                <p className="font-bebas text-4xl md:text-5xl tracking-wider">This isn't just a social initiative; it's a serious economic model.</p>
            </div>
        </div>
      </section>

      {/* Economic Impact Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-bebas text-slate-800">The Economics of Responsibility</h2>
                <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                    Small, positive habits, when scaled across millions of citizens, directly translate into massive GDP growth.
                </p>
            </div>
            
            <div className="mt-16 bg-white p-8 rounded-lg shadow-xl">
                <h3 className="text-3xl font-bebas text-center mb-8">How People's Habits Directly Grow GDP</h3>
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip cursor={{fill: 'rgba(255, 153, 51, 0.1)'}} />
                            <Legend />
                            <Bar dataKey="GDP_Impact" name="Impact on GDP (in Crores, illustrative)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="my-20 max-w-4xl mx-auto bg-gradient-to-r from-yr-green to-emerald-700 text-white p-8 rounded-lg shadow-2xl text-center">
                <p className="font-bebas text-4xl md:text-5xl tracking-wider">1 Crore Responsible Citizens = ₹2 Lakh Crore Efficiency Gain/Year</p>
            </div>
            
            <div>
                <h3 className="text-4xl font-bebas text-center mb-8">Micro Actions, Macro Impact</h3>
                 <div className="space-y-6 max-w-5xl mx-auto">
                    {microImpactData.map((item, index) => (
                        <MicroImpactVisualizer key={index} item={item} />
                    ))}
                </div>
                <h4 className="mt-8 text-4xl font-bebas text-center text-yr-saffron">Small actions. Crore-level impact.</h4>
            </div>
        </div>
      </section>
    </div>
  );
};

export default MissionAndImpactPage;