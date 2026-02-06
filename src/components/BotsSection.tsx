import { useEffect, useState } from 'react';
import { supabase, type Bot } from '../lib/supabase';
import { ExternalLink, Sparkles, Music, Headphones, Shield, MessageCircle } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Nightmare Music': Music,
  'Nightmare Support': MessageCircle,
};

export function BotsSection() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    const { data, error } = await supabase
      .from('bots')
      .select('*')
      .eq('is_active', true)
      .order('order_index');

    if (!error && data) {
      setBots(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="bots" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-cyan-400">Loading bots...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="bots" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Bots</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Powerful Discord Bots
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built with precision and powered by AI to enhance your Discord server experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bots.map((bot, index) => {
            const Icon = iconMap[bot.name] || Bot;
            return (
              <div
                key={bot.id}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-cyan-500/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl"
                    style={{
                      background: `linear-gradient(135deg, ${bot.color}, ${bot.color}dd)`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {bot.name}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {bot.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {bot.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-gray-300">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={bot.invite_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
                  >
                    <span>Invite to Server</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
