// frontend/src/pages/ContentManagement.tsx
import React from "react";
import client from "../api/client";
import { useApp } from "../contexts/AppContext";

export default function ContentManagement() {
  const {
    lessons,
    activities,
  } = useApp();

  // Helpers that call server and notify context to refresh
  const notifyDataChanged = () => {
    window.dispatchEvent(new CustomEvent("data:changed"));
  };

  // ---------- Lessons ----------
  const handleCreateLesson = async () => {
    const title = window.prompt("Lesson title?");
    if (!title) return;
    const description = window.prompt("Short description?", "");
    try {
      await client.post("/lessons", { title, description, published: true });
      notifyDataChanged();
    } catch (err) {
      console.error("Create lesson failed", err);
      alert("Failed to create lesson (see console).");
    }
  };

  const handleEditLesson = async (lesson: any) => {
    // Simple prompt edit for quick testing
    const title = window.prompt("Edit lesson title:", lesson.title ?? "");
    if (title === null) return; // cancelled
    const description = window.prompt("Edit description:", lesson.description ?? "");
    try {
      // backend may expect numeric id or _id
      const idPart = lesson._id ?? lesson.id;
      await client.put(`/lessons/${idPart}`, {
        ...lesson,
        title,
        description,
      });
      notifyDataChanged();
    } catch (err) {
      console.error("Edit lesson failed", err);
      alert("Failed to edit lesson (see console).");
    }
  };

  const handleDeleteLesson = async (lesson: any) => {
    if (!confirm(`Delete lesson "${lesson.title}"? This cannot be undone.`)) return;
    try {
      const idPart = lesson._id ?? lesson.id;
      await client.delete(`/lessons/${idPart}`);
      notifyDataChanged();
    } catch (err) {
      console.error("Delete lesson failed", err);
      alert("Failed to delete lesson (see console).");
    }
  };

  // ---------- Activities ----------
  const handleCreateActivity = async () => {
    const title = window.prompt("Activity title?");
    if (!title) return;
    const description = window.prompt("Short description?", "");
    // optionally let admin pick related lesson id
    const relatedLessonId = window.prompt("Related lesson id (optional):", "");
    const payload: any = { title, description, published: true };
    if (relatedLessonId) payload.relatedLessonId = Number(relatedLessonId) || relatedLessonId;
    try {
      await client.post("/activities", payload);
      notifyDataChanged();
    } catch (err) {
      console.error("Create activity failed", err);
      alert("Failed to create activity (see console).");
    }
  };

  const handleEditActivity = async (activity: any) => {
    const title = window.prompt("Edit activity title:", activity.title ?? "");
    if (title === null) return;
    const description = window.prompt("Edit description:", activity.description ?? "");
    try {
      const idPart = activity._id ?? activity.id;
      await client.put(`/activities/${idPart}`, {
        ...activity,
        title,
        description,
      });
      notifyDataChanged();
    } catch (err) {
      console.error("Edit activity failed", err);
      alert("Failed to edit activity (see console).");
    }
  };

  const handleDeleteActivity = async (activity: any) => {
    if (!confirm(`Delete activity "${activity.title}"? This cannot be undone.`)) return;
    try {
      const idPart = activity._id ?? activity.id;
      await client.delete(`/activities/${idPart}`);
      notifyDataChanged();
    } catch (err) {
      console.error("Delete activity failed", err);
      alert("Failed to delete activity (see console).");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-6">Content Management</h1>

      <div style={{ display: "flex", gap: 32 }}>
        <div style={{ flex: 1, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18 }}>Lessons</h2>
            <button onClick={handleCreateLesson} style={{ background: "#0b1227", color: "#fff", padding: "6px 12px", borderRadius: 8 }}>Create Lesson</button>
          </div>

          <div>
            {lessons && lessons.length ? (
              lessons.map((l: any) => (
                <div key={l._id ?? l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{l.title}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>{l.description}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleEditLesson(l)} style={{ background: "#071028", color: "#fff", borderRadius: 8, padding: "6px 10px" }}>Edit</button>
                    <button onClick={() => handleDeleteLesson(l)} style={{ background: "#ff4d4f", color: "#fff", borderRadius: 8, padding: "6px 10px" }}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No lessons</div>
            )}
          </div>
        </div>

        <div style={{ width: 420, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 6px rgba(0,0,0,.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ fontSize: 18 }}>Activities</h2>
            <button onClick={handleCreateActivity} style={{ background: "#071028", color: "#fff", padding: "6px 12px", borderRadius: 8 }}>Create Activity</button>
          </div>

          <div>
            {activities && activities.length ? (
              activities.map((a: any) => (
                <div key={a._id ?? a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>{a.description}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleEditActivity(a)} style={{ background: "#071028", color: "#fff", borderRadius: 8, padding: "6px 10px" }}>Edit</button>
                    <button onClick={() => handleDeleteActivity(a)} style={{ background: "#ff4d4f", color: "#fff", borderRadius: 8, padding: "6px 10px" }}>Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div>No activities</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
