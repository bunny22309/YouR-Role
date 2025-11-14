import React, { useState } from 'react';

// FIX: Add explicit types to the Modal component props.
const Modal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void; }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-2xl">&times;</button>
            <h3 className="text-2xl font-bebas text-yr-blue mb-4">{title}</h3>
            <div className="text-slate-600 space-y-4">
                {children}
            </div>
        </div>
    </div>
);

const DownloadForm = ({onSuccess}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSuccess();
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <p>Enter your details below to get your free copy of the "101 Ways of YouR Role" PDF.</p>
            <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
                <input required type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
            </div>
             <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                <input required type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
            </div>
            <button type="submit" className="w-full bg-yr-green text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition duration-300">Download PDF</button>
        </form>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <section className={`py-16 ${className}`}><div className="container mx-auto px-6"><h2 className="text-4xl font-bebas text-center mb-10 text-slate-800">{title}</h2>{children}</div></section>
);

const AccordionItem: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4 px-6 font-bold text-lg text-slate-700 hover:bg-slate-100 transition"><span>{title}</span><span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span></button>
            {isOpen && <div className="p-6 bg-white">{children}</div>}
        </div>
    );
};

const EbookPage: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const handleDownloadSuccess = () => {
        setDownloadSuccess(true);
        setTimeout(() => {
            setShowModal(false);
            setDownloadSuccess(false);
        }, 3000);
    }

    return (
        <>
        {showModal && (
            <Modal title={downloadSuccess ? "Success!" : "Get Your Free Ebook"} onClose={() => setShowModal(false)}>
                {downloadSuccess ? (
                     <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-yr-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="mt-4 text-lg">Your download will begin shortly. Thank you for taking the first step!</p>
                    </div>
                ) : (
                    <DownloadForm onSuccess={handleDownloadSuccess} />
                )}
            </Modal>
        )}
        <div className="bg-slate-50">
            <header className="bg-white text-center py-20">
                <div className="container mx-auto px-6">
                    <h1 className="text-5xl md:text-7xl font-bebas text-yr-blue tracking-wider">101 Ways of YouR Role</h1>
                    <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">The practical field guide for citizens who want to build a better India — not with slogans, but with action.</p>
                    <button onClick={() => setShowModal(true)} className="mt-8 bg-yr-green text-white font-bold py-4 px-10 rounded-full text-xl hover:scale-105 transform transition duration-300 shadow-lg">Download Now (Free PDF)</button>
                </div>
            </header>
            <Section title="The YouR Role Philosophy"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-7xl mx-auto"><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-xl text-yr-blue">Accountability First</h3><p className="mt-2 text-slate-600">Why real change must start with individual responsibility, not just demands from the system.</p></div><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-xl text-yr-blue">Contribution {'>'} Complaint</h3><p className="mt-2 text-slate-600">The critical difference between pointing out a problem and taking ownership of the solution.</p></div><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-xl text-yr-blue">Core Principles</h3><p className="mt-2 text-slate-600">Our movement is built on Verification, Consistency, Local Impact, and Transparency.</p></div><div className="bg-white p-6 rounded-lg shadow-md"><h3 className="font-bold text-xl text-yr-blue">Measurable Impact</h3><p className="mt-2 text-slate-600">How your daily actions connect directly to measurable gains in GDP and national productivity.</p></div></div></Section>
            <Section title="A Preview of the 101 Ways" className="bg-white"><p className="text-center text-lg text-slate-600 max-w-3xl mx-auto mb-10">This ebook is not theory. It’s a “How to act” manual. Here’s a glimpse of the actionable themes covered.</p><div className="max-w-4xl mx-auto bg-slate-50 rounded-lg shadow-inner overflow-hidden"><AccordionItem title="A. Cleanliness & Waste"><ul className="list-disc list-inside space-y-2 text-slate-700"><li>How to "Adopt-a-Spot" and maintain one street stretch weekly.</li><li>How to file a data-backed complaint for non-functional garbage trucks.</li><li>The 30-minute community clean-up: templates for posters and WhatsApp messages.</li><li><strong>What not to do:</strong> Avoid burning waste, using non-permitted dump zones.</li></ul></AccordionItem><AccordionItem title="B. Traffic & Public Discipline"><ul className="list-disc list-inside space-y-2 text-slate-700"><li>How to report illegal parking with photo proof and track it with an RTI follow-up.</li><li>How to create lane discipline in your residential area using simple markings.</li><li><strong>What not to do:</strong> Don’t chase offenders or argue — learn to escalate correctly and safely.</li></ul></AccordionItem><AccordionItem title="D. Civic Accountability"><ul className="list-disc list-inside space-y-2 text-slate-700"><li>How to find and track your local ward’s maintenance budget online.</li><li>The perfect RTI: a template for filing a complaint that gets answered.</li><li><strong>What not to do:</strong> Avoid spam complaints and emotional rants — how to write fact-based appeals.</li></ul></AccordionItem><AccordionItem title="...And 90+ More Actionable Roles"><p className="text-slate-700">The full guide covers Energy & Water Conservation, Social Behaviour, Public Courtesy, and much more, giving you a complete toolkit for civic action.</p></AccordionItem></div></Section>
            <Section title="Your Toolkit for Change"><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center"><div className="bg-white p-6 rounded-lg shadow-md"><span className="text-4xl">📄</span><p className="mt-2 font-semibold">Complaint Letters</p></div><div className="bg-white p-6 rounded-lg shadow-md"><span className="text-4xl">📝</span><p className="mt-2 font-semibold">RTI Templates</p></div><div className="bg-white p-6 rounded-lg shadow-md"><span className="text-4xl">📢</span><p className="mt-2 font-semibold">Event Posters</p></div><div className="bg-white p-6 rounded-lg shadow-md"><span className="text-4xl">✅</span><p className="mt-2 font-semibold">Community Checklists</p></div><div className="bg-white p-6 rounded-lg shadow-md"><span className="text-4xl">📸</span><p className="mt-2 font-semibold">Verification Photo Guide</p></div></div></Section>
            <Section title="The Code of YouR Role" className="bg-yr-blue text-white"><div className="max-w-3xl mx-auto text-center space-y-4 font-bebas text-3xl tracking-wide"><p>“Don’t fake impact. Don’t post for clout.”</p><p>“Verify before claiming credit.”</p><p>“Stay polite but persistent.”</p><p>“Focus local, not national.”</p></div></Section>
            <div className="py-20 text-center"><h2 className="text-4xl font-bebas text-slate-800">Become a Part of the Solution</h2><p className="mt-2 text-lg text-slate-600">Download the free ebook and start playing your role today.</p><button onClick={() => setShowModal(true)} className="mt-8 bg-yr-green text-white font-bold py-4 px-10 rounded-full text-xl hover:scale-105 transform transition duration-300 shadow-lg">Get Your Free Copy</button></div>
        </div>
        </>
    );
};

export default EbookPage;
