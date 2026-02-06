import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Bot, Command, Users, Settings } from 'lucide-react';
import { BotsManager } from './BotsManager';
import { PartnersManager } from './PartnersManager';
import { MessagesViewer } from './MessagesViewer';

type Tab = 'bots' | 'partners' | 'messages' | 'settings';

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('bots');

  const tabs = [
    { id: 'bots' as Tab, label: 'Bots', icon: Bot },
    { id: 'partners' as Tab, label: 'Partners', icon: Users },
    { id: 'messages' as Tab, label: 'Messages', icon: Command },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Nightmare Bots Admin</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20">
          {activeTab === 'bots' && <BotsManager />}
          {activeTab === 'partners' && <PartnersManager />}
          {activeTab === 'messages' && <MessagesViewer />}
          {activeTab === 'settings' && (
            <div className="text-center py-12 text-gray-400">
              Settings panel coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
