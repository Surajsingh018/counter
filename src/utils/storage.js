// utils/storage.js

export const STORAGE_KEY = "bhaktiUsers";

export const getUsers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const createDefaultMantra = () => ({
  radha: { totalCount: 0, dailyCounts: {} },
  ram: { totalCount: 0, dailyCounts: {} },
  shiva: { totalCount: 0, dailyCounts: {} },
});

export const getToday = () => new Date().toISOString().split("T")[0];

export const getYesterday = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};
