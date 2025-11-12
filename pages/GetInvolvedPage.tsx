import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// FIX: Add explicit types to the Modal component props.
const Modal: React.FC<{ title: string; children: React.ReactNode; onClose: () => void; }> = ({ title, children, onClose }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">&times;</button>
            <h3 className="text-2xl font-bebas text-yr-blue mb-4">{title}</h3>
            <div className="text-slate-600 space-y-4">
                {children}
            </div>
        </div>
    </div>
);

const InvolvementCard: React.FC<{
  title: string;
  description: string;
  ctaText: string;
  icon: string;
}> = ({ title, description, ctaText, icon }) => (
  <div className="bg-white rounded-lg shadow-xl p-8 text-center flex flex-col items-center border-b-8 border-yr-saffron transform hover:-translate-y-2 transition-transform duration-300 h-full">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="text-3xl font-bebas text-slate-800">{title}</h3>
    <p className="mt-4 text-slate-600 flex-grow">{description}</p>
    <button className="mt-8 bg-yr-blue text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors duration-300">
      {ctaText}
    </button>
  </div>
);

const GetInvolvedPage: React.FC = () => {
    const [modalContent, setModalContent] = useState(null);

    const handleCardClick = (type) => {
        switch (type) {
            case 'individual':
                setModalContent({
                    title: "Join the App",
                    content: <p>Our mobile app is the heart of the movement. It's coming soon to the Apple App Store and Google Play Store. Sign up for our newsletter to be the first to know when it launches!</p>
                });
                break;
            case 'college':
                setModalContent({
                    title: "Become a Partner Institution",
                    content: <div><p>We'd love to partner with you to bring YouR Role to your campus. Please reach out to our partnerships team to get started.</p><a href="mailto:partnerships@yourrole.com" className="font-bold text-yr-blue hover:underline">partnerships@yourrole.com</a></div>
                });
                break;
            case 'csr':
                setModalContent({
                    title: "Sponsor a Mission",
                    content: <div><p>Your CSR funds can create measurable, on-ground change. Visit our Partnerships page to learn more about our transparent model.</p><Link to="/collaboration" className="font-bold text-yr-blue hover:underline">Learn More &rarr;</Link></div>
                });
                break;
            case 'gov':
                setModalContent({
                    title: "Request an Impact Pilot",
                    content: <div><p>Let's work together to build a more efficient and citizen-powered India. Contact our government relations team to discuss a pilot program for your city.</p><a href="mailto:gov@yourrole.com" className="font-bold text-yr-blue hover:underline">gov@yourrole.com</a></div>
                });
                break;
            default:
                setModalContent(null);
        }
    };
    
  return (
    <>
      {modalContent && <Modal title={modalContent.title} onClose={() => setModalContent(null)}>{modalContent.content}</Modal>}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bebas text-slate-800">Choose YouR Role</h1>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Change begins with a single step. Whether you're an individual, an institution, or a government body, there's a role for you to play.
            </p>
          </div>

          <div className="my-16 bg-gradient-to-r from-yr-blue to-blue-800 text-white p-8 rounded-lg shadow-2xl max-w-5xl mx-auto text-center">
              <h2 className="text-4xl font-bebas tracking-wider">The Official Field Guide is Here</h2>
              <p className="mt-4 max-w-3xl mx-auto">
                  Ready to act but not sure where to start? We've codified our movement into a practical, step-by-step ebook. "101 Ways of YouR Role" is your manual for real-world change.
              </p>
              <Link to="/ebook" className="mt-6 inline-block bg-yr-saffron text-white font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition duration-300 shadow-lg">
                  Explore the Ebook
              </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div onClick={() => handleCardClick('individual')} className="cursor-pointer"><InvolvementCard icon="🧑" title="As an Individual" description="Download the app, start completing missions, and earn points and rewards. Be the change you want to see in your neighborhood." ctaText="Join the App" /></div>
            <div onClick={() => handleCardClick('college')} className="cursor-pointer"><InvolvementCard icon="🏫" title="As a College/School" description="Become a 'Role Partner Institution'. Integrate civic responsibility into your curriculum and run campus-wide impact competitions." ctaText="Become a Partner" /></div>
            <div onClick={() => handleCardClick('csr')} className="cursor-pointer"><InvolvementCard icon="🏢" title="As a Company (CSR)" description="Sponsor missions that align with your CSR goals, offer internships to top performers, and showcase your commitment to building a better India." ctaText="Sponsor a Mission" /></div>
            <div onClick={() => handleCardClick('gov')} className="cursor-pointer"><InvolvementCard icon="🏛️" title="As a Government Body" description="Partner with us to launch a pilot program in your city or department. Leverage citizen energy to reduce costs and improve services." ctaText="Request an Impact Pilot" /></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetInvolvedPage;