// frontend/src/components/modals/CreateLessonModal.tsx
import React, { useState } from "react";
import { lessonsApi } from "../../api/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // optional
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onCreated?: (lesson: any) => void;
};

export const CreateLessonModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("10 min");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [lessonsCount, setLessonsCount] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);
    if (!title.trim()) { setError("Title is required"); return; }
    setLoading(true);
    try {
      const payload: any = {
        title: title.trim(),
        description: description.trim(),
        category,
        duration,
        difficulty,
        lessons: lessonsCount,
        progress: 0,
        status: "not-started",
        published: true,
      };
      const res = await lessonsApi.create(payload);
      const created = res.data ?? res;
      window.dispatchEvent(new CustomEvent("data:changed"));
      if (onCreated) onCreated(created);
      onClose();
      return created;
    } catch (err: any) {
      console.error("CreateLessonModal.create error", err);
      setError(err?.response?.data?.message ?? err?.message ?? "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => !loading && onClose()} />
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Create Lesson</h3>
          <button onClick={() => !loading && onClose()} className="p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Introduction to Numbers" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            {typeof Textarea !== "undefined" ? (
              <Textarea value={description} onChange={(e: any) => setDescription(e.target.value)} placeholder="Short description" />
            ) : (
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duration</label>
              <Input value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty</label>
              <Input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lessons Count</label>
              <Input type="number" value={String(lessonsCount)} onChange={(e) => setLessonsCount(Number(e.target.value || 1))} />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => !loading && onClose()} disabled={loading}>Cancel</Button>
            <Button onClick={handleCreate} disabled={loading}>{loading ? "Creating..." : "Create Lesson"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
