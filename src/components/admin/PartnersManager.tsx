import { useEffect, useState } from 'react';
import { supabase, type Partner } from '../../lib/supabase';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const emptyPartner: Partial<Partner> = {
    name: '',
    description: '',
    invite_url: '',
    icon_url: '',
    member_count: 0,
    is_active: true,
  };

  const [formData, setFormData] = useState(emptyPartner);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPartners(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (editingPartner) {
      await supabase
        .from('partners')
        .update(formData)
        .eq('id', editingPartner.id);
    } else {
      await supabase.from('partners').insert([formData]);
    }

    setEditingPartner(null);
    setIsCreating(false);
    setFormData(emptyPartner);
    fetchPartners();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      await supabase.from('partners').delete().eq('id', id);
      fetchPartners();
    }
  };

  const startEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData(partner);
    setIsCreating(false);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingPartner(null);
    setFormData(emptyPartner);
  };

  const cancelEdit = () => {
    setEditingPartner(null);
    setIsCreating(false);
    setFormData(emptyPartner);
  };

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Partners</h2>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      {(editingPartner || isCreating) && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingPartner ? 'Edit Partner' : 'Add New Partner'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Partner Name"
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
              type="number"
              placeholder="Member Count"
              value={formData.member_count}
              onChange={(e) => setFormData({ ...formData, member_count: parseInt(e.target.value) || 0 })}
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
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-gray-900/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-white">{partner.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(partner)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-3">{partner.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{partner.member_count.toLocaleString()} members</span>
              <span className={`text-xs px-2 py-1 rounded ${partner.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {partner.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
