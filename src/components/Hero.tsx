import { Bot, Sparkles, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl mb-8 transform hover:scale-110 transition-transform duration-500 hover:rotate-12 shadow-2xl animate-float">
          <Bot className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500 animate-gradient">
            Nightmare Bots
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
          Professional Discord bots powered by cutting-edge AI technology
        </p>

        <p className="text-lg text-cyan-400 mb-12 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 animate-pulse" />
          Music, Support, Security & More
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#bots"
            className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 hover:-translate-y-1 shadow-2xl hover:shadow-cyan-500/50"
          >
            <span className="flex items-center gap-2">
              Explore Bots
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-gray-800/50 backdrop-blur-xl text-white font-bold rounded-xl border-2 border-cyan-500/50 hover:bg-gray-800/80 hover:border-cyan-500 transition-all transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '10+', label: 'Bot Types' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' },
            { number: '1000+', label: 'Servers' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400 font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-8 h-8 text-cyan-400" />
      </div>
    </section>
  );
}
