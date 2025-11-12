import React, { useState, useEffect } from 'react';

const rewardsData = [
  {
    category: 'Career',
    title: "Guaranteed Internship Interview",
    partner: "With TechCorp Solutions",
    points: 5000,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Experiences',
    title: "Meetup with City Commissioner",
    partner: "Civic Engagement Reward",
    points: 20000,
    image: "https://images.unsplash.com/photo-1588595402422-3507403a4dda?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Merchandise',
    title: "YouR Role Official T-Shirt",
    partner: "Official Merchandise",
    points: 1500,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Career',
    title: "Factory Visit & Mentorship Session",
    partner: "At Innovate Motors",
    points: 10000,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Coupons',
    title: "20% Off Eco-Friendly Products",
    partner: "By GreenLife Inc.",
    points: 500,
    image: "https://images.unsplash.com/photo-1542601906-82381a346955?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Career',
    title: "Online Course on Public Policy",
    partner: "From The Learning Hub",
    points: 2500,
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Merchandise',
    title: "YouR Role 'Change Maker' Badge",
    partner: "Official Merchandise",
    points: 200,
    image: "https://images.unsplash.com/photo-1629841922849-3c180b2a7428?q=80&w=400&h=300&fit=crop"
  },
  {
    category: 'Coupons',
    title: "₹100 Off on Movie Tickets",
    partner: "By Cinema Plus",
    points: 300,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&h=300&fit=crop"
  },
];

// FIX: Add explicit types to the Modal component props.
const Modal: React.FC<{ title: string; children: React.ReactNode; onConfirm: () => void; onCancel: () => void; }> = ({ title, children, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
            <h3 className="text-2xl font-bebas text-yr-blue mb-4">{title}</h3>
            <div className="text-slate-600 mb-8">{children}</div>
            <div className="flex justify-center gap-4">
                <button onClick={onCancel} className="bg-slate-200 text-slate-800 font-bold py-2 px-6 rounded-md hover:bg-slate-300 transition">Cancel</button>
                <button onClick={onConfirm} className="bg-yr-green text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition">Confirm</button>
            </div>
        </div>
    </div>
);

const AnimatedPoints = ({ endValue, duration = 1000 }) => {
    const [count, setCount] = useState(endValue);

    useEffect(() => {
        let startTime;
        const startValue = count;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(startValue - (progress * (startValue - endValue))));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [endValue, duration]);
    
    return <>{count.toLocaleString()}</>;
};

const RewardCard: React.FC<{ reward: any; userPoints: number; onRedeem: (reward: any) => void; }> = ({ reward, userPoints, onRedeem }) => {
  const canAfford = userPoints >= reward.points;
  const pointsNeeded = reward.points - userPoints;
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleClick = () => {
    if (canAfford) {
        onRedeem(reward);
        // This is a visual cue, the actual point deduction happens in the parent
        setIsRedeemed(true);
        setTimeout(() => setIsRedeemed(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col">
      <div className="relative">
        <img src={reward.image} alt={reward.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-2 right-2 bg-yr-saffron text-white font-bold py-1 px-3 rounded-full text-sm shadow-md">{reward.points.toLocaleString()} Pts</div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm text-slate-500">{reward.partner}</p>
        <h3 className="text-lg font-bold text-slate-800 flex-grow">{reward.title}</h3>
        <button 
            onClick={handleClick}
            className={`mt-4 w-full font-bold py-2 rounded-md transition-colors duration-300 ${
                canAfford 
                ? (isRedeemed ? 'bg-green-500 text-white' : 'bg-yr-green text-white hover:bg-opacity-90') 
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
            disabled={!canAfford || isRedeemed}
        >
            {isRedeemed ? '✓ Redeemed!' : (canAfford ? 'Redeem Now' : `Needs ${pointsNeeded.toLocaleString()} pts`)}
        </button>
      </div>
    </div>
  );
};

const StorePage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [userPoints, setUserPoints] = useState(2850);
    const [modalItem, setModalItem] = useState(null);

    const handleRedeemClick = (reward) => {
        if (userPoints >= reward.points) {
            setModalItem(reward);
        }
    };

    const confirmRedemption = () => {
        if (modalItem) {
            setUserPoints(prevPoints => prevPoints - modalItem.points);
            setModalItem(null);
        }
    };

    const categories = ['All', 'Featured', 'Merchandise', 'Career', 'Coupons', 'Experiences'];
    const getFeaturedRewards = () => rewardsData.filter(r => r.points >= 5000);
    const filteredRewards = 
        activeCategory === 'All' ? rewardsData :
        activeCategory === 'Featured' ? getFeaturedRewards() :
        rewardsData.filter(reward => reward.category === activeCategory);

    const categoryButtonClass = (category: string) => `px-5 py-2 font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
        activeCategory === category 
        ? 'bg-yr-blue text-white shadow-md' 
        : 'bg-white text-slate-600 hover:bg-slate-100 hover:shadow-sm'
    }`;

  return (
    <>
      {modalItem && (
        <Modal 
            title="Confirm Redemption"
            onCancel={() => setModalItem(null)}
            onConfirm={confirmRedemption}
        >
            <p>Are you sure you want to redeem <strong className="text-slate-800">{modalItem.title}</strong> for <strong className="text-yr-saffron">{modalItem.points.toLocaleString()}</strong> points?</p>
        </Modal>
      )}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bebas text-yr-blue">The Reward Center</h1>
            <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
              Your hard work deserves recognition. Redeem the Impact Points you've earned for exclusive rewards from our partners.
            </p>
          </div>

          <div className="mt-12 mb-10 bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto text-center sticky top-24 z-40">
              <p className="text-slate-600">Welcome, Role Model!</p>
              <p className="text-3xl font-bold text-yr-saffron">
                  <AnimatedPoints endValue={userPoints} />
                  <span className="text-lg text-slate-700 font-medium"> Impact Points</span>
              </p>
          </div>

          <div className="mt-16 mb-12 flex justify-center">
              <div className="bg-white p-2 rounded-full shadow-inner flex space-x-2 overflow-x-auto">
                  {categories.map(cat => (
                      <button key={cat} onClick={() => setActiveCategory(cat)} className={categoryButtonClass(cat)}>
                          {cat}
                      </button>
                  ))}
              </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredRewards.map((reward, index) => (
                  <RewardCard key={index} reward={reward} userPoints={userPoints} onRedeem={handleRedeemClick} />
              ))}
          </div>
          
          {filteredRewards.length === 0 && (
              <div className="text-center col-span-full py-20">
                  <p className="text-xl text-slate-500">No rewards found in this category.</p>
              </div>
          )}

          <div className="mt-20 bg-white -mx-6 px-6 py-16">
              <div className="max-w-4xl mx-auto">
                  <h2 className="text-3xl font-bebas text-center mb-8 text-slate-800">Our Sustainable Revenue Model</h2>
                  <div className="space-y-6 text-slate-700">
                      <div className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-yr-blue"><h3 className="font-bold text-lg text-yr-blue">Corporate Partnerships</h3><p>Corporates pay a platform fee to list their rewards, coupons, and internships in our store, gaining access to a highly engaged audience of responsible citizens.</p></div>
                      <div className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-yr-blue"><h3 className="font-bold text-lg text-yr-blue">Institutional Subscriptions</h3><p>Educational institutions and other organizations pay a subscription fee for premium features like custom leaderboards, impact analytics, and co-branded digital certificates for their members.</p></div>
                      <div className="bg-slate-50 p-6 rounded-lg shadow-md border-l-4 border-yr-blue"><h3 className="font-bold text-lg text-yr-blue">Impact-as-a-Service</h3><p>Government bodies and large organizations contract us to run specific, large-scale civic campaigns, paying for the platform, verification, and engagement services we provide.</p></div>
                  </div>
                  <p className="mt-8 text-center text-slate-600 font-semibold">
                      This creates a self-sustaining loop: citizen action generates value, which attracts partners, whose investment enhances the platform and rewards more citizen action.
                  </p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;