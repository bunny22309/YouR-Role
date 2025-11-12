import React, { useState } from 'react';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-1 transition-transform">
    <p className="text-4xl font-bebas text-yr-saffron">{value}</p>
    <p className="mt-2 text-slate-600 font-semibold">{label}</p>
  </div>
);

const FounderCard: React.FC<{ name: string; title: string; image: string; description: string; }> = ({ name, title, image, description }) => (
    <div className="text-center">
        <img src={image} alt={name} className="w-40 h-40 rounded-full mx-auto shadow-lg object-cover" />
        <h3 className="mt-4 text-2xl font-bold text-slate-800">{name}</h3>
        <p className="text-yr-blue font-semibold">{title}</p>
        <p className="mt-2 text-slate-600 max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

const TeamPage: React.FC = () => {
  const [formState, setFormState] = useState({
    loading: false,
    submitted: false,
    error: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });
    // Simulate API call
    setTimeout(() => {
        setFormState({ loading: false, submitted: true, error: '' });
    }, 1500);
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="bg-slate-100 p-8 rounded-lg max-w-4xl mx-auto">
            <p className="font-bebas text-4xl md:text-5xl text-yr-blue tracking-wider">“Treat India like your own company, and you are its CEO. Your actions dictate its profits and losses.”</p>
          </div>
        </div>

        {/* Founders Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bebas text-center mb-12 text-slate-800">The Driving Force</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <FounderCard 
              name="Sachin Kumar" 
              title="Founder & Chief Role-Model" 
              image="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&fit=crop&crop=faces"
              description="Sachin's vision is rooted in a simple, powerful economic truth: a nation's progress is the sum of its people's actions. He founded YouR Role with the singular mission to build a progressive India from the ground up, focusing on citizen-led welfare and economic efficiency. His goal is to prove that responsible citizenship is the most potent, untapped driver of national growth."
            />
          </div>
        </section>

        {/* Community Section */}
        <section className="mt-20 bg-slate-50 -mx-6 px-6 py-16">
          <h2 className="text-4xl font-bebas text-center mb-12 text-slate-800">Our Growing Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <StatCard value="15,000+" label="Volunteers" />
            <StatCard value="45" label="Partner Schools/Colleges" />
            <StatCard value="12" label="Active Cities" />
            <StatCard value="₹2.7 Crore" label="Verified Savings" />
          </div>
        </section>

        {/* Join Us Form */}
        <section className="mt-20">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-2xl border-t-4 border-yr-green">
            <h2 className="text-3xl font-bebas text-center mb-6 text-slate-800">Become a Role Leader — Take Charge of Your City’s Change</h2>
            {formState.submitted ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-16 w-16 text-yr-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h3 className="mt-4 text-2xl font-bold text-slate-800">Thank you!</h3>
                <p className="text-slate-600 mt-2">We've received your application and will be in touch soon.</p>
              </div>
            ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                <input required type="text" id="name" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                <input required type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
              </div>
               <div>
                <label htmlFor="city" className="block text-sm font-medium text-slate-700">Your City</label>
                <input required type="text" id="city" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700">Why do you want to join?</label>
                <textarea required id="message" rows={4} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-yr-saffron focus:border-yr-saffron"></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-yr-green text-white font-bold py-3 px-4 rounded-md hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
                disabled={formState.loading}
              >
                {formState.loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'I\'m Ready to Lead'}
              </button>
            </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;