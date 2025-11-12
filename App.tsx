import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionAndImpactPage from './pages/MissionAndImpactPage';
import PlatformPage from './pages/PlatformPage';
import CollaborationPage from './pages/CollaborationPage';
import TeamPage from './pages/TeamPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import DashboardPage from './pages/DashboardPage';
import StorePage from './pages/StorePage';
import ProfilePage from './pages/ProfilePage';
import EbookPage from './pages/EbookPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mission" element={<MissionAndImpactPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/ebook" element={<EbookPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;