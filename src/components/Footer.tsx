import { Bot, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-cyan-500/20 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black text-white">Nightmare Bots</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional Discord bots powered by AI technology, built to enhance your server experience.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#bots" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Our Bots
              </a>
              <a href="#creator" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Creator
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Contact
              </a>
              <a href="/admin" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Admin Panel
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Community</h4>
            <a
              href="https://discord.gg/UFmyB6BmBj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 text-sm shadow-lg"
            >
              <span>Join Support Server</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Bruce
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Nightmare Bots. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
