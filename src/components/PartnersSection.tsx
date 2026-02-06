import { useEffect, useState } from 'react';
import { supabase, type Partner } from '../lib/supabase';
import { ExternalLink, Users, Sparkles } from 'lucide-react';

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPartners(data);
    }
    setLoading(false);
  };

  if (loading || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Community</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Partner Servers
          </h2>
          <p className="text-xl text-gray-400">
            Join our amazing community partners
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-cyan-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {partner.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{partner.member_count.toLocaleString()} members</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                {partner.description}
              </p>

              <a
                href={partner.invite_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 text-sm shadow-lg hover:shadow-cyan-500/50"
              >
                <span>Join Server</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
