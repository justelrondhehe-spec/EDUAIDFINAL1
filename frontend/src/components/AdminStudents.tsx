// frontend/src/components/AdminStudents.tsx
import React, { useEffect, useState } from 'react';
import { adminApi } from '../api/api';
import { Button } from './ui/button';

export function AdminStudents() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [busyId, setBusyId] = useState<string|null>(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminApi.users();
      const data = res.data;
      setUsers(data.users ?? data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const promote = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.updateUserRole(id, 'admin');
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to promote user');
    } finally { setBusyId(null); }
  };

  const demote = async (id: string) => {
    setBusyId(id);
    try {
      await adminApi.updateUserRole(id, 'user');
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to demote user');
    } finally { setBusyId(null); }
  };

  const removeUser = async (id: string) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    setBusyId(id);
    try {
      await adminApi.deleteUser(id);
      await loadUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    } finally { setBusyId(null); }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Users</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {loading ? <div>Loading users...</div> : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id ?? u.id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.role ?? 'user'}</td>
                  <td className="p-3 flex gap-2">
                    {u.role !== 'admin' ? (
                      <Button size="sm" onClick={() => promote(u._id ?? u.id)} disabled={busyId === (u._id ?? u.id)}>Promote</Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => demote(u._id ?? u.id)} disabled={busyId === (u._id ?? u.id)}>Demote</Button>
                    )}
                    <Button size="sm" className="bg-red-500 text-white" onClick={() => removeUser(u._id ?? u.id)} disabled={busyId === (u._id ?? u.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
