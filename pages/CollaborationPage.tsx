
import React from 'react';

const CollaborationCard: React.FC<{ title: string; subtitle: string; children: React.ReactNode; cta: string; to: string }> = ({ title, subtitle, children, cta, to }) => (
    <div className="bg-white p-8 rounded-lg shadow-xl border-l-8 border-yr-saffron transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-4xl font-bebas text-yr-blue">{title}</h2>
        <p className="text-lg text-slate-600 mt-1">{subtitle}</p>
        <div className="mt-6 space-y-4 text-slate-700">
            {children}
        </div>
        <a href={to} className="mt-8 inline-block bg-yr-saffron text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition">
            {cta}
        </a>
    </div>
);

const CollaborationPage: React.FC = () => {
    return (
        <div className="py-20 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bebas text-slate-800">Partner with the Revolution</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                        We build bridges between citizens, government, and corporate India to create a self-sustaining cycle of responsibility and growth.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <CollaborationCard 
                        title="For Governments" 
                        subtitle="Turn Expenses into Investments"
                        cta="Request Impact Pilot"
                        to="/get-involved"
                    >
                        <p><strong className="text-slate-800">The Problem:</strong> Massive, recurring expenses on cleaning, waste management, public property repair, and administrative inefficiency.</p>
                        <p><strong className="text-slate-800">The Solution:</strong> A citizen-powered monitoring and prevention network that directly reduces these costs. We gamify civic duty to create proactive, not reactive, governance.</p>
                        <p><strong className="text-slate-800">Our Offer:</strong> YouR Role manages citizen engagement, verification, and reporting. You pay only for verified, measurable impact, ensuring every rupee spent delivers tangible savings.</p>
                        <p><strong className="text-slate-800">Deliverables:</strong> Real-time data reports, public transparency dashboards, and RTI-friendly metrics that showcase fiscal prudence and citizen partnership.</p>
                    </CollaborationCard>

                    <CollaborationCard 
                        title="For Corporates (CSR)" 
                        subtitle="Invest in a Responsible India"
                        cta="Sponsor a Mission"
                        to="/get-involved"
                    >
                        <p><strong className="text-slate-800">The Opportunity:</strong> Go beyond traditional charity. Fund missions under the "Civic Responsibility" CSR head that create scalable, long-term behavioural change.</p>
                        <p><strong className="text-slate-800">The Benefit:</strong> Get audit-ready impact reports and unparalleled public visibility through in-app branding, mission videos, and social media campaigns. Associate your brand with nation-building.</p>
                        <p><strong className="text-slate-800">Engagement Avenues:</strong> Sponsor city-wide cleanliness missions, fund internship badges for top 'Role Leaders', or power impact competitions for colleges.</p>
                        <p><strong className="text-slate-800">Our Model:</strong> We connect your CSR funds to verified on-ground action, providing a transparent and high-impact alternative to conventional donations.</p>
                    </CollaborationCard>
                </div>

                <div className="mt-20 text-center">
                    <div className="bg-yr-green text-white p-8 rounded-lg shadow-2xl max-w-3xl mx-auto">
                        <p className="font-bebas text-4xl md:text-5xl tracking-wider">“Fund responsibility, not charity.”</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollaborationPage;
