// frontend/src/utils/adminActions.ts
import { lessonsApi, activitiesApi } from "../api/api";

/**
 * These wrapper helpers ensure we dispatch `data:changed` after a server change
 * so other parts of the app (GlobalDataContext / AppContext) will re-fetch.
 */

async function dispatchDataChanged() {
  try {
    window.dispatchEvent(new CustomEvent("data:changed"));
  } catch {}
}

export async function createLesson(payload: any) {
  const res = await lessonsApi.create(payload);
  await dispatchDataChanged();
  return res.data;
}

export async function updateLesson(id: string | number, payload: any) {
  const res = await lessonsApi.update(String(id), payload);
  await dispatchDataChanged();
  return res.data;
}

export async function deleteLesson(id: string | number) {
  const res = await lessonsApi.delete(String(id));
  await dispatchDataChanged();
  return res.data;
}

export async function createActivity(payload: any) {
  const res = await activitiesApi.create(payload);
  await dispatchDataChanged();
  return res.data;
}

export async function updateActivity(id: string | number, payload: any) {
  const res = await activitiesApi.update(String(id), payload);
  await dispatchDataChanged();
  return res.data;
}

export async function deleteActivity(id: string | number) {
  const res = await activitiesApi.delete(String(id));
  await dispatchDataChanged();
  return res.data;
}
