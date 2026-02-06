import { useAuth } from './contexts/AuthContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { BotsSection } from './components/BotsSection';
import { CreatorSection } from './components/CreatorSection';
import { ContactSection } from './components/ContactSection';
import { PartnersSection } from './components/PartnersSection';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  const { user, loading } = useAuth();
  const isAdminRoute = window.location.pathname === '/admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  if (isAdminRoute) {
    return user ? <AdminDashboard /> : <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <Hero />
      <BotsSection />
      <CreatorSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
