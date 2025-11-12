import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";

const StatCard: React.FC<{ value: string | number; label: string; }> = ({ value, label }) => (
    <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-3xl font-bebas text-yr-blue">{value}</p>
        <p className="text-sm text-slate-600 font-semibold">{label}</p>
    </div>
);

const ReportMissionForm = () => {
    const [aiInput, setAiInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        category: 'Public Infrastructure',
        city: '',
        state: '',
        location: '',
        impact: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues(prev => ({...prev, [id]: value}));
    };

    const handleAnalyze = async () => {
        if (!aiInput) return;
        setIsLoading(true);
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Analyze the following user report about a civic issue and extract structured data. User report: "${aiInput}"`,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING, description: 'A concise, descriptive title for the mission (e.g., "Large Pothole on Main Street").' },
                            description: { type: Type.STRING, description: 'A detailed description of the issue based on the user\'s report.' },
                            category: { 
                                type: Type.STRING, 
                                description: 'The best category for this issue. Choose from: "Cleanliness & Sanitation", "Public Infrastructure", "Waste Management", "Safety Hazard", "Other".'
                            },
                            impact: { type: Type.STRING, description: 'A brief, estimated positive impact if the issue is resolved (e.g., "Fixing this could prevent accidents and vehicle damage."). Can be empty if not mentioned.' }
                        }
                    }
                }
            });
            const result = JSON.parse(response.text);
            setFormValues(prev => ({
                ...prev,
                title: result.title || '',
                description: result.description || '',
                category: result.category || 'Other',
                impact: result.impact || '',
            }));

        } catch (e) {
            console.error(e);
            setError('Failed to analyze with AI. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-inner">
            <h3 className="text-2xl font-bebas text-slate-800">Report a Mission</h3>
            <p className="text-slate-600 mb-6">Found a civic issue? Describe it below and let our AI assistant help you draft the report.</p>
            
            {/* AI Assistant Section */}
            <div className="bg-slate-100 p-4 rounded-lg mb-8 border border-slate-200">
                <label htmlFor="ai-input" className="block text-sm font-bold text-yr-blue mb-2">AI Assistant</label>
                <textarea 
                    id="ai-input"
                    rows={3}
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder="e.g., 'There's a huge pile of garbage overflowing near the bus stop at Sector 5 market. It's been there for days and smells terrible, might cause health issues.'" 
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron"
                ></textarea>
                <button 
                    type="button" 
                    onClick={handleAnalyze} 
                    disabled={isLoading || !aiInput}
                    className="mt-2 bg-yr-blue text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition disabled:bg-slate-400 flex items-center justify-center"
                >
                    {isLoading ? (
                        <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyzing...</>
                    ) : 'Analyze with AI ✨'}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mission Photo</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-yr-saffron"><div className="space-y-1 text-center"><svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg><div className="flex text-sm text-slate-600"><p className="pl-1">Click to upload photo</p></div><p className="text-xs text-slate-500">Recommended: Clear image of the issue</p></div></div>
                </div>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700">Mission Title *</label>
                    <input type="text" id="title" value={formValues.title} onChange={handleInputChange} placeholder="e.g., Broken streetlight on Main Road" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required />
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description *</label>
                    <textarea id="description" rows={4} value={formValues.description} onChange={handleInputChange} placeholder="Describe the issue in detail..." className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required></textarea>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-700">Category *</label>
                        <select id="category" value={formValues.category} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required>
                            <option>Cleanliness & Sanitation</option>
                            <option>Public Infrastructure</option>
                            <option>Waste Management</option>
                            <option>Safety Hazard</option>
                            <option>Other</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="city" className="block text-sm font-medium text-slate-700">City *</label>
                        <input type="text" id="city" value={formValues.city} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required />
                    </div>
                     <div>
                        <label htmlFor="state" className="block text-sm font-medium text-slate-700">State *</label>
                        <input type="text" id="state" value={formValues.state} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-700">Specific Location *</label>
                    <input type="text" id="location" value={formValues.location} onChange={handleInputChange} placeholder="e.g., Near XYZ Mall, ABC Road" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" required />
                </div>
                <div>
                    <label htmlFor="impact" className="block text-sm font-medium text-slate-700">Estimated Impact (Optional)</label>
                    <input type="text" id="impact" value={formValues.impact} onChange={handleInputChange} placeholder="e.g., This can save ₹500/month in electricity costs" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <button type="button" className="text-slate-600 font-medium py-2 px-4 rounded-md hover:bg-slate-100 transition">Cancel</button>
                    <button type="submit" className="bg-yr-green text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition">Submit Mission</button>
                </div>
            </form>
        </div>
    );
};


const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('browse');

    const renderContent = () => {
        switch (activeTab) {
            case 'browse':
                return (
                     <div className="bg-white p-8 rounded-lg shadow-inner">
                        <h3 className="text-2xl font-bebas text-slate-800">Browse Missions</h3>
                        <p className="text-slate-600 mb-6">Discover civic issues in your area and make an impact.</p>
                        <div className="mb-6"><input type="text" placeholder="Search missions by title, location, or description..." className="w-full px-4 py-3 bg-white border border-slate-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yr-saffron focus:border-yr-saffron"/></div>
                        <div className="flex flex-wrap gap-2 mb-8"><button className="px-4 py-1 bg-yr-saffron text-white rounded-full font-semibold">All Missions</button><button className="px-4 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">Cleanliness</button><button className="px-4 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">Energy</button><button className="px-4 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">Traffic</button><button className="px-4 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition">Public Property</button></div>
                        <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg"><svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10h6" /></svg><h4 className="mt-2 text-xl font-semibold text-slate-800">No missions found</h4><p className="mt-1 text-slate-500">Be the first to report a mission in your area.</p><button onClick={() => setActiveTab('report')} className="mt-6 bg-yr-green text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition">Report First Mission</button></div>
                    </div>
                );
            case 'missions':
                return <div className="text-center py-12 bg-white p-8 rounded-lg shadow-inner"><p className="text-slate-500">You haven't reported any missions yet. Report one to get started!</p></div>;
            case 'history':
                return <div className="text-center py-12 bg-white p-8 rounded-lg shadow-inner"><p className="text-slate-500">No points earned yet. Complete a verified mission to see your history.</p></div>;
            case 'report':
            default:
                return <ReportMissionForm />;
        }
    };

    const tabClass = (tabName: string) => `px-6 py-3 font-bebas text-2xl cursor-pointer rounded-t-lg transition-colors duration-300 ${activeTab === tabName ? 'bg-slate-100 text-yr-saffron border-b-4 border-yr-saffron' : 'text-slate-500 hover:bg-slate-200/50'}`;

    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">Welcome, Role Model!</h1>
                            <p className="text-slate-600">Your journey to transform India starts now.</p>
                            <div className="mt-6"><div className="flex justify-between items-end mb-1"><span className="text-lg font-bold text-slate-700">Level 1</span><span className="text-sm font-semibold text-yr-saffron">0 / 1000 Points to Level 2</span></div><div className="w-full bg-slate-200 rounded-full h-4"><div className="bg-yr-saffron h-4 rounded-full" style={{ width: `0%` }}></div></div></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4"><StatCard value={0} label="Total Missions" /><StatCard value={0} label="Pending Verification" /><StatCard value={0} label="Total Points" /></div>
                    </div>
                </div>
                <div>
                     <div className="border-b border-slate-300 flex space-x-2 overflow-x-auto"><button onClick={() => setActiveTab('browse')} className={tabClass('browse')}>Browse Missions</button><button onClick={() => setActiveTab('report')} className={tabClass('report')}>Report a Mission</button><button onClick={() => setActiveTab('missions')} className={tabClass('missions')}>Your Missions</button><button onClick={() => setActiveTab('history')} className={tabClass('history')}>Point History</button></div>
                    <div className="bg-slate-100 p-4 rounded-b-lg">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;