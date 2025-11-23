// frontend/src/components/modals/CreateActivityModal.tsx
import React, { useState } from "react";
import { activitiesApi } from "../../api/api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // if you have one, otherwise use <textarea>
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  onCreated?: (activity: any) => void;
};

export const CreateActivityModal: React.FC<Props> = ({ onClose, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Interactive Quiz");
  const [subject, setSubject] = useState("General");
  const [dueTimestamp, setDueTimestamp] = useState<string>("");
  const [points, setPoints] = useState<number>(100);
  const [totalQuestions, setTotalQuestions] = useState<number | undefined>(undefined);
  const [relatedLessonId, setRelatedLessonId] = useState<number | undefined>(undefined);
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
        type,
        subject,
        points,
        totalQuestions,
        relatedLessonId,
        status: "pending",
        dueTimestamp: dueTimestamp ? new Date(dueTimestamp).getTime() : undefined,
        // ensure published true by default
        published: true,
      };
      // remove undefined keys
      Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

      const res = await activitiesApi.create(payload);
      const created = res.data ?? res;
      // notify global app and caller
      window.dispatchEvent(new CustomEvent("data:changed"));
      if (onCreated) onCreated(created);
      onClose();
      return created;
    } catch (err: any) {
      console.error("CreateActivityModal.create error", err);
      setError(err?.response?.data?.message ?? err?.message ?? "Failed to create activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={() => !loading && onClose()} />
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Create Activity</h3>
          <button onClick={() => !loading && onClose()} className="p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Shapes & Colors Challenge" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            {/* if you have Textarea component */}
            {typeof Textarea !== "undefined" ? (
              <Textarea value={description} onChange={(e: any) => setDescription(e.target.value)} placeholder="Short description" />
            ) : (
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <Input value={type} onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Points</label>
              <Input type="number" value={String(points)} onChange={(e) => setPoints(Number(e.target.value || 0))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Questions (optional)</label>
              <Input type="number" value={totalQuestions ?? ""} onChange={(e) => setTotalQuestions(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Related Lesson ID (optional)</label>
              <Input value={relatedLessonId ?? ""} onChange={(e) => setRelatedLessonId(e.target.value ? Number(e.target.value) : undefined)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due (date/time) (optional)</label>
              <Input type="datetime-local" value={dueTimestamp} onChange={(e) => setDueTimestamp(e.target.value)} />
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="ghost" onClick={() => !loading && onClose()} disabled={loading}>Cancel</Button>
            <Button onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create Activity"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
