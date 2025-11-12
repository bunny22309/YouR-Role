import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// --- SVG ICONS ---
const BrainIcon = () => <svg className="w-10 h-10 text-pink-400 flex-shrink-0" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M224 128a80.09 80.09 0 0 0-80-80a80 80 0 0 0-77.52 64.73a32 32 0 1 0-2.43 30.54A80.07 80.07 0 0 0 128 208a80.09 80.09 0 0 0 80-80a80.81 80.81 0 0 0-1.12-13.11a32 32 0 1 0-18.76-33.78A80.2 80.2 0 0 0 224 128ZM48 160a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm48-56a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm48 24a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm48-32a16 16 0 1 1 16 16a16 16 0 0 1-16-16Z"/></svg>;
const ApathyIcon = () => <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>;
const BlameIcon = () => <svg className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const PotentialIcon = () => <svg className="h-10 w-10 text-yr-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;

const IdentifyIcon = () => <svg className="h-12 w-12 text-yr-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ActIcon = () => <svg className="h-12 w-12 text-yr-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.016z" /></svg>;
const EarnIcon = () => <svg className="h-12 w-12 text-yr-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1M7 12h10M7 16h10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" /></svg>;

// --- ANIMATED COMPONENTS ---
const AnimatedStat = ({ endValue, label, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const end = parseFloat(String(endValue).replace(/[^0-9.]/g, ''));
    const isCurrency = label.toLowerCase().includes('cr');
    const isPlus = String(endValue).includes('+');

    useEffect(() => {
        let startTime;
        let animationFrameId;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentNum = progress * end;

            setCount(currentNum);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };
        animationFrameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(animationFrameId);
    }, [endValue, end, duration]);
    
    const displayValue = isCurrency 
        ? `₹${count.toFixed(1)} Cr` 
        : `${Math.ceil(count).toLocaleString()}${isPlus ? '+' : ''}`;

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
            <p className="text-5xl font-bebas text-yr-blue">{displayValue}</p>
            <p className="mt-2 font-semibold tracking-wider text-slate-600">{label}</p>
        </div>
    );
};

// --- UI COMPONENTS ---
const ParadoxCard = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
            {icon}
            <h3 className="font-bold text-xl text-slate-800">{title}</h3>
        </div>
        <p className="mt-4 text-slate-600">{description}</p>
    </div>
);

const HowItWorksStep = ({ icon, title, description }) => (
    <div className="text-center flex flex-col items-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">{icon}</div>
        <h3 className="font-bebas text-2xl text-slate-800">{title}</h3>
        <p className="mt-2 text-slate-600 max-w-xs">{description}</p>
    </div>
);


const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-slate-800 overflow-x-hidden">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .delay-200 { animation-delay: 200ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-600 { animation-delay: 600ms; }
      `}</style>
      
      {/* Hero Section */}
      <section 
        className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 text-slate-800"
      >
        <div className="relative container mx-auto px-6 pt-32 pb-40 text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bebas tracking-wider uppercase animate-fadeInUp text-yr-blue">
            Your Role – The People-Powered Revolution
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl animate-fadeInUp delay-200 text-slate-700">
            A movement turning citizens into reformers, one action at a time.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fadeInUp delay-400">
            <Link 
              to="/profile" 
              className="bg-yr-saffron text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition duration-300 shadow-lg"
            >
              Play Your Role
            </Link>
            <Link 
              to="/mission" 
              className="bg-white text-slate-800 font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition duration-300 shadow-lg"
            >
              Know the Impact
            </Link>
          </div>
        </div>
        <div className="relative container mx-auto px-6 -mb-10 animate-fadeInUp delay-600">
            <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-xl flex items-center justify-center space-x-4">
                <BrainIcon />
                <p className="font-bebas text-lg md:text-2xl tracking-wide text-yr-blue text-center">
                    “IF 1 CRORE INDIANS ACT, INDIA GROWS BY 1% FASTER – NOT BY POLICIES, BUT BY PEOPLE.”
                </p>
            </div>
        </div>
      </section>

      {/* The Paradox Section */}
      <section className="py-20 pt-28 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center animate-fadeInUp">
            <h2 className="text-4xl font-bebas text-slate-800">The Great Indian Paradox</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              We are a nation of problem-solvers, yet we are surrounded by problems we choose to ignore. Potholes, garbage, inefficiency — we see it, we complain, and we move on.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fadeInUp delay-200"><ParadoxCard icon={<ApathyIcon />} title="Apathy is Expensive" description="Every ignored civic issue costs the nation crores in repairs, health crises, and lost productivity. Your silence has a price tag." /></div>
            <div className="animate-fadeInUp delay-400"><ParadoxCard icon={<BlameIcon />} title="The Blame Game" description="It's easy to blame the 'system'. But the system is made of people. It's made of us. The cycle of blame leads nowhere." /></div>
            <div className="animate-fadeInUp delay-600"><ParadoxCard icon={<PotentialIcon />} title="Untapped Potential" description="Imagine if 1% of Indians dedicated 10 minutes a day to fixing one small thing. The cumulative impact would reshape our nation." /></div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12 animate-fadeInUp">
                <h2 className="text-4xl md:text-5xl font-bebas text-yr-blue">Introducing YouR Role: The System for Change</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">We've built a gamified platform that makes civic responsibility rewarding, measurable, and impactful.</p>
            </div>
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                 <div className="absolute top-1/3 left-0 right-0 h-1 hidden md:block">
                     <svg width="100%" height="100%"><line x1="15%" y1="0" x2="85%" y2="0" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 8" /></svg>
                 </div>
                 <div className="animate-fadeInUp delay-200"><HowItWorksStep icon={<IdentifyIcon />} title="1. Identify & Report" description="Use our app to report local issues. Your geo-tagged report is the first step towards a verified solution." /></div>
                 <div className="animate-fadeInUp delay-400"><HowItWorksStep icon={<ActIcon />} title="2. Act & Verify" description="Take action yourself or follow up with officials. Our dual-proof system verifies your impact." /></div>
                 <div className="animate-fadeInUp delay-600"><HowItWorksStep icon={<EarnIcon />} title="3. Earn & Inspire" description="Earn Impact Points for every verified action. Climb leaderboards, redeem rewards, and inspire others." /></div>
            </div>
            <div className="text-center mt-12 animate-fadeInUp">
                 <Link to="/mission" className="text-yr-blue font-bold hover:underline">
                    Learn about our Mission & Impact &rarr;
                </Link>
            </div>
        </div>
      </section>
      
      {/* Stats/Credibility Section */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatedStat endValue="15000+" label="Role Models" />
                <AnimatedStat endValue="12" label="Active Cities" />
                <AnimatedStat endValue="8400+" label="Missions Completed" />
                <AnimatedStat endValue="2.7" label="Verified Savings (Cr)" />
            </div>
        </div>
      </section>

      {/* Final CTA */}
       <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center animate-fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bebas text-slate-800">India's future is not a spectator sport.</h2>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            It's time to get in the game. It's time to play your role.
          </p>
          <div className="mt-8">
            <Link to="/get-involved" className="bg-yr-green text-white font-bold py-4 px-10 rounded-full text-xl hover:scale-105 transform transition duration-300 shadow-lg">
              Get Involved Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;