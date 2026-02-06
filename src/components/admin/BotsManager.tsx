import { useEffect, useState } from 'react';
import { supabase, type Bot } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export function BotsManager() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyBot: Partial<Bot> = {
    name: '',
    description: '',
    features: [],
    invite_url: '',
    icon_url: '',
    color: '#5865F2',
    is_active: true,
    order_index: 0,
  };

  const [formData, setFormData] = useState(emptyBot);

  useEffect(() => {
    fetchBots();
  }, []);

  const fetchBots = async () => {
    const { data, error } = await supabase
      .from('bots')
      .select('*')
      .order('order_index');

    if (!error && data) {
      setBots(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingBot) {
      await supabase
        .from('bots')
        .update(formData)
        .eq('id', editingBot.id);
    } else {
      await supabase.from('bots').insert([formData]);
    }

    setEditingBot(null);
    setIsCreating(false);
    setFormData(emptyBot);
    fetchBots();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this bot?')) {
      await supabase.from('bots').delete().eq('id', id);
      fetchBots();
    }
  };

  const startEdit = (bot: Bot) => {
    setEditingBot(bot);
    setFormData(bot);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingBot(null);
    setFormData(emptyBot);
  };

  const cancelEdit = () => {
    setEditingBot(null);
    setIsCreating(false);
    setFormData(emptyBot);
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Bots</h2>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Bot
        </button>
      </div>

      {(editingBot || isCreating) && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingBot ? 'Edit Bot' : 'Create New Bot'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Bot Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Invite URL"
              value={formData.invite_url}
              onChange={(e) => setFormData({ ...formData, invite_url: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white md:col-span-2 h-24"
            />
            <input
              type="text"
              placeholder="Icon URL"
              value={formData.icon_url}
              onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Color (#hex)"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white">{bot.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(bot)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(bot.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm">{bot.description}</p>
            <div className="mt-3 flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: bot.color }}
              />
              <span className={`text-xs px-2 py-1 rounded ${bot.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {bot.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
