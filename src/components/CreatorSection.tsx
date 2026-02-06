import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, MessageCircle, Code, Sparkles } from 'lucide-react';

interface CreatorInfo {
  name: string;
  discord: string;
  avatar: string;
}

export function CreatorSection() {
  const [creator, setCreator] = useState<CreatorInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCreator();
  }, []);

  const fetchCreator = async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'creator_info')
      .maybeSingle();

    if (!error && data) {
      setCreator(data.value as CreatorInfo);
    }
    setLoading(false);
  };

  if (loading || !creator) {
    return null;
  }

  return (
    <section id="creator" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Meet the Creator</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Behind the Code
          </h2>
          <p className="text-xl text-gray-400">
            The mastermind behind Nightmare Bots
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform duration-500 shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-black text-white mb-2">
                {creator.name}
              </h3>
              <div className="flex items-center gap-2 text-cyan-400 mb-6 justify-center md:justify-start">
                <MessageCircle className="w-5 h-5" />
                <span className="font-mono text-lg">{creator.discord}</span>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl">
                Passionate developer crafting innovative Discord bots with cutting-edge AI technology.
                Dedicated to creating powerful, reliable solutions that enhance Discord communities worldwide.
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Full-Stack Developer
                </div>
                <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Specialist
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Want to collaborate or have a project in mind?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
          >
            <MessageCircle className="w-5 h-5" />
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
