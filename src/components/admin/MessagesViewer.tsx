import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Clock, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  discord_id: string;
  project_description: string;
  email: string;
  status: string;
  created_at: string;
}

export function MessagesViewer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    fetchMessages();
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Contact Messages</h2>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-semibold">Discord: {message.discord_id}</p>
                    {message.email && (
                      <p className="text-gray-400 text-sm">{message.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {new Date(message.created_at).toLocaleDateString()}
                </div>
              </div>

              <p className="text-gray-300 mb-4">{message.project_description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(message.id, 'reviewed')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    message.status === 'reviewed'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Reviewed
                </button>
                <button
                  onClick={() => updateStatus(message.id, 'pending')}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    message.status === 'pending'
                      ? 'bg-yellow-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
