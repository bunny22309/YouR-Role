import React, { useState } from 'react';

// Icons as simple functional components
const GeoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ImpactPointsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>;
const RewardsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>;
const LeaderboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const VerificationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yr-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.016z" /></svg>;

// Phone Screen Components
const ScreenWrapper: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="space-y-3">
        <h2 className="text-center text-lg font-bold text-white tracking-wider">{title}</h2>
        {children}
    </div>
);

const GeoMissionScreen = () => (
    <ScreenWrapper title="Missions Nearby">
        <div className="bg-white/10 p-2 rounded-lg text-sm">📍 Fix broken streetlight - Sector 15</div>
        <div className="bg-white/10 p-2 rounded-lg text-sm">🗑️ Clean up park - Nehru Garden</div>
        <div className="bg-white/10 p-2 rounded-lg text-sm">💧 Report water leak - MG Road</div>
        <div className="bg-slate-700/50 h-32 rounded-lg mt-2 flex items-center justify-center text-slate-400 text-xs">
            [ Interactive Map View ]
        </div>
    </ScreenWrapper>
);

const ImpactPointsScreen = () => (
    <ScreenWrapper title="Your Impact">
        <div className="bg-white/10 p-3 rounded-lg text-center">
            <p className="text-xs text-slate-300">POINTS EARNED</p>
            <p className="text-4xl font-bold text-yr-saffron">1,450</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg text-sm">✅ Verified: Pothole Report (+50 pts)</div>
        <div className="bg-white/10 p-2 rounded-lg text-sm">✅ Verified: Tree Plantation (+100 pts)</div>
        <div className="bg-white/10 p-2 rounded-lg text-sm">⏳ Pending: Waste Segregation...</div>
    </ScreenWrapper>
);

const RewardsScreen = () => (
    <ScreenWrapper title="Rewards Store">
        <div className="bg-white/10 p-2 rounded-lg">
            <p className="font-bold">Official T-Shirt</p>
            <p className="text-xs text-yr-saffron">1500 Points</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">
            <p className="font-bold">Internship Interview</p>
            <p className="text-xs text-yr-saffron">5000 Points</p>
        </div>
        <div className="bg-white/10 p-2 rounded-lg">
            <p className="font-bold">20% Off Coupon</p>
            <p className="text-xs text-yr-saffron">500 Points</p>
        </div>
    </ScreenWrapper>
);

const LeaderboardScreen = () => (
    <ScreenWrapper title="City Leaderboard">
         <div className="bg-white/10 p-2 rounded-lg flex items-center justify-between text-sm">
            <span>🥇 Aarav S.</span><span className="font-bold text-yr-saffron">15200</span>
        </div>
        <div className="bg-white/10 p-2 rounded-lg flex items-center justify-between text-sm">
            <span>🥈 Sanya V.</span><span className="font-bold text-yr-saffron">14850</span>
        </div>
         <div className="bg-white/10 p-2 rounded-lg flex items-center justify-between text-sm">
            <span>🥉 Vikram S.</span><span className="font-bold text-yr-saffron">13900</span>
        </div>
        <div className="bg-white/10 p-2 rounded-lg flex items-center justify-between text-sm">
            <span>4. Priya P.</span><span className="font-bold text-yr-saffron">12500</span>
        </div>
    </ScreenWrapper>
);

const DashboardScreen = () => (
    <ScreenWrapper title="National Impact">
        <div className="bg-white/10 p-3 rounded-lg flex-grow flex flex-col items-center justify-center h-40">
            <p className="text-xs text-slate-300">SAVED NATIONALLY</p>
            <p className="text-yr-saffron text-5xl font-bold">₹2.7 Cr</p>
            <p className="text-sm">and growing...</p>
        </div>
        <p className="text-center text-xs text-slate-400">Your actions are contributing to this live figure.</p>
    </ScreenWrapper>
);

const VerificationScreen = () => (
     <ScreenWrapper title="Verification">
        <div className="bg-white/10 p-3 rounded-lg flex-grow flex flex-col items-center justify-center text-center h-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.016z" /></svg>
            <p className="font-bold mt-2">Dual-Proof System</p>
            <p className="text-xs text-slate-300">Photo/video evidence + field validation ensures every mission is genuine.</p>
        </div>
    </ScreenWrapper>
);

const features = [
  { id: 'geo', icon: <GeoIcon />, title: "Geo-Missions", description: "Discover local civic problems mapped in your area, from potholes to overflowing bins, ready for you to tackle.", screen: <GeoMissionScreen /> },
  { id: 'points', icon: <ImpactPointsIcon />, title: "Impact Points", description: "Earn points for every verified fix or report. Your contribution is measured and rewarded, turning civic duty into a motivating game.", screen: <ImpactPointsScreen /> },
  { id: 'rewards', icon: <RewardsIcon />, title: "Rewards Store", description: "Redeem your points for exclusive coupons, internships with top companies, and YouR Role merchandise.", screen: <RewardsScreen /> },
  { id: 'leaderboard', icon: <LeaderboardIcon />, title: "Leaderboards", description: "Compete and see the top contributors in your city, college, or nationwide. Inspire and get inspired.", screen: <LeaderboardScreen /> },
  { id: 'dashboard', icon: <DashboardIcon />, title: "Impact Dashboard", description: "See the real-time financial savings your actions generate for the nation, displayed publicly and transparently.", screen: <DashboardScreen /> },
  { id: 'verification', icon: <VerificationIcon />, title: "Verification Layer", description: "Our dual-proof system (photo/video + field validation) ensures every action is genuine and impactful.", screen: <VerificationScreen /> },
];

const FeatureCardInteractive: React.FC<{ feature: typeof features[0]; isActive: boolean; onHover: () => void }> = ({ feature, isActive, onHover }) => (
    <div
      onMouseEnter={onHover}
      className={`p-6 rounded-lg cursor-pointer transition-all duration-300 flex items-start space-x-4 ${isActive ? 'bg-white shadow-xl border-l-4 border-yr-saffron scale-105' : 'bg-slate-100/70 hover:bg-white'}`}
    >
      <div className="flex-shrink-0">{feature.icon}</div>
      <div>
        <h3 className="text-xl font-bold text-slate-800">{feature.title}</h3>
        <p className={`mt-1 text-slate-600 transition-all duration-300 ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 md:max-h-40 md:opacity-100'}`}>{feature.description}</p>
      </div>
    </div>
);


const PlatformPage: React.FC = () => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

    return (
        <div className="bg-slate-50 py-20 overflow-hidden">
             <style>{`
                @keyframes screenFadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-screenFadeIn {
                    animation: screenFadeIn 0.5s ease-in-out forwards;
                }
            `}</style>
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bebas text-slate-800">The Gamified System for Change</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                        This is more than awareness — it’s a structured, tech-driven platform to measure, reward, and scale responsible citizenship.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-20">
                    {/* Features List */}
                    <div className="w-full lg:w-1/2 space-y-4 lg:order-1">
                        {features.map((feature, index) => (
                            <FeatureCardInteractive 
                                key={feature.id}
                                feature={feature} 
                                isActive={activeFeatureIndex === index}
                                onHover={() => setActiveFeatureIndex(index)}
                            />
                        ))}
                    </div>

                    {/* App Mockup */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:order-2 lg:sticky top-28">
                        <div className="w-80 h-[600px] bg-slate-900 rounded-[40px] shadow-2xl border-8 border-slate-700 p-2 relative">
                            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-700 rounded-full z-10"></div>
                            <div className="bg-gradient-to-br from-yr-blue to-blue-900 h-full w-full rounded-[32px] p-4 text-white flex flex-col overflow-hidden">
                                {features[activeFeatureIndex] && (
                                    <div key={features[activeFeatureIndex].id} className="animate-screenFadeIn">
                                        {features[activeFeatureIndex].screen}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlatformPage;