import React, { useState, useEffect } from 'react';

// --- ICONS ---
const MissionsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118-8.016z" /></svg>;
const SavingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1M7 12h10M7 16h10" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;


const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode }> = ({ value, label, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 border-l-4 border-yr-saffron transform hover:-translate-y-1 transition-transform">
    <div className="text-3xl text-yr-saffron">{icon}</div>
    <div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      <p className="text-slate-600">{label}</p>
    </div>
  </div>
);

const allUsers = [
    { rank: 1, name: 'Aarav Sharma', city: 'Mumbai', points: 15200, avatar: 'https://i.pravatar.cc/40?u=1' },
    { rank: 2, name: 'Sanya Verma', city: 'Delhi', points: 14850, avatar: 'https://i.pravatar.cc/40?u=2' },
    { rank: 3, name: 'Vikram Singh', city: 'Bengaluru', points: 13900, avatar: 'https://i.pravatar.cc/40?u=3' },
    { rank: 4, name: 'Priya Patel', city: 'Ahmedabad', points: 12500, avatar: 'https://i.pravatar.cc/40?u=4' },
    { rank: 5, name: 'Rohan Joshi', city: 'Pune', points: 11800, avatar: 'https://i.pravatar.cc/40?u=5' },
    { rank: 6, name: 'Neha Reddy', city: 'Hyderabad', points: 11200, avatar: 'https://i.pravatar.cc/40?u=6' },
    { rank: 7, name: 'Anjali Mehta', city: 'Jaipur', points: 10500, avatar: 'https://i.pravatar.cc/40?u=7' },
    { rank: 8, name: 'Karan Malhotra', city: 'Kolkata', points: 9800, avatar: 'https://i.pravatar.cc/40?u=8' },
    { rank: 9, name: 'YOU', city: 'Your City', points: 9500, avatar: 'https://i.pravatar.cc/40?u=9' },
];

const allActivities = [
    { user: 'Rohan J.', action: 'reported a broken streetlight in Pune.', time: '2 mins ago', avatar: 'https://i.pravatar.cc/40?u=5' },
    { user: 'Priya P.', action: 'completed a clean-up drive in Ahmedabad.', time: '15 mins ago', avatar: 'https://i.pravatar.cc/40?u=4' },
    { user: 'Sanya V.', action: 'verified a water leakage mission in Delhi.', time: '1 hour ago', avatar: 'https://i.pravatar.cc/40?u=2' },
    { user: 'Anjali M.', action: 'planted 5 saplings in Jaipur.', time: '3 hours ago', avatar: 'https://i.pravatar.cc/40?u=7' },
    { user: 'Aarav S.', action: 'posted an update on a road repair mission.', time: '5 hours ago', avatar: 'https://i.pravatar.cc/40?u=1' },
    { user: 'Karan M.', action: 'organized a traffic awareness campaign.', time: '8 hours ago', avatar: 'https://i.pravatar.cc/40?u=8' },
    { user: 'Neha R.', action: 'submitted proof for waste segregation.', time: '1 day ago', avatar: 'https://i.pravatar.cc/40?u=6' },
];

const RankMedal: React.FC<{ rank: number }> = ({ rank }) => {
  const medalClass = rank === 1 ? 'bg-yellow-400' : rank === 2 ? 'bg-slate-300' : rank === 3 ? 'bg-yellow-600' : 'bg-slate-200';
  const textClass = rank === 1 ? 'text-yellow-800' : rank === 2 ? 'text-slate-700' : rank === 3 ? 'text-yellow-800' : 'text-slate-600';
  return <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${medalClass} ${textClass}`}>{rank}</div>;
};

const DashboardPage: React.FC = () => {
    // FIX: Add a unique ID to each initial activity item for the 'key' prop in the map function.
    const [recentActivity, setRecentActivity] = useState(
        allActivities.slice(0, 5).map((activity, index) => ({ ...activity, id: index }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = allActivities[Math.floor(Math.random() * allActivities.length)];
            const newActivityWithId = { ...newActivity, id: Date.now() + Math.random() };
            setRecentActivity(prev => [newActivityWithId, ...prev.slice(0, 5)]);
        }, 5000); // Add a new activity every 5 seconds

        return () => clearInterval(interval);
    }, []);

  return (
    <div className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bebas text-yr-blue">Live Impact Dashboard</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Welcome back, Role Model! Track our collective impact in real-time.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard value="8,432" label="Missions Completed" icon={<MissionsIcon />} />
          <StatCard value="₹2.7 Cr" label="Verified Savings" icon={<SavingsIcon />} />
          <StatCard value="23,900" label="Registered Users" icon={<UsersIcon />} />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Leaderboard Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bebas text-center mb-6 text-slate-800">Overall Leaderboard</h2>
                <div className="space-y-3">
                    {allUsers.slice(0,8).map((user) => (
                        <div key={user.rank} className={`flex items-center p-3 rounded-lg transition-all duration-300 ${user.name === 'YOU' ? 'bg-yr-saffron/20 ring-2 ring-yr-saffron scale-105' : 'bg-slate-50 hover:bg-slate-100'}`}>
                            <RankMedal rank={user.rank} />
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                            <div className="ml-4 flex-grow">
                                <p className="font-bold text-slate-800">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.city}</p>
                            </div>
                            <p className="font-bold text-yr-saffron text-lg">{user.points.toLocaleString()} pts</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-lg shadow-2xl">
                <h2 className="text-3xl font-bebas text-center mb-6 text-slate-800">Live Activity</h2>
                <div className="space-y-4">
                    {recentActivity.map((activity: any) => (
                         <div key={activity.id} className="flex items-start animate-fadeIn">
                            <img src={activity.avatar} alt={activity.user} className="w-10 h-10 rounded-full mt-1" />
                            <div className="ml-3">
                                <p className="text-sm text-slate-700">
                                    <span className="font-bold">{activity.user}</span> {activity.action}
                                </p>
                                <p className="text-xs text-slate-500">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default DashboardPage;