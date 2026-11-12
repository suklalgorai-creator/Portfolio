import { JOURNEY_CATEGORIES, journeyCmsSeed } from '../data/journeyCmsSeed';

const STORAGE_KEY = 'sg_journey_cms_entries_v1';
const CHANNEL_NAME = 'sg_journey_cms_channel';
const CUSTOM_EVENT_NAME = 'sg:journey-updated';

const validCategoryIds = new Set(JOURNEY_CATEGORIES.map((c) => c.id));

let channel = null;
if (typeof BroadcastChannel !== 'undefined') {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
  } catch {
    channel = null;
  }
}

function normalizeEntry(raw) {
  const category = validCategoryIds.has(raw.category) ? raw.category : 'Technical milestones';
  const status = raw.status === 'draft' ? 'draft' : 'published';
  return {
    id: String(raw.id || `entry-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
    title: String(raw.title || '').trim(),
    category,
    displayDate: String(raw.displayDate || '').trim() || '2026',
    sortDate: String(raw.sortDate || '').trim() || new Date().toISOString().slice(0, 10),
    organization: String(raw.organization || '').trim(),
    badge: String(raw.badge || '').trim(),
    description: String(raw.description || '').trim(),
    link: String(raw.link || '').trim(),
    status,
    featured: Boolean(raw.featured),
    updatedAt: raw.updatedAt || new Date().toISOString()
  };
}

function sortEntriesDesc(entries) {
  return [...entries].sort((a, b) => {
    const dateCompare = String(b.sortDate || '').localeCompare(String(a.sortDate || ''));
    if (dateCompare !== 0) return dateCompare;
    return String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
  });
}

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = sortEntriesDesc(journeyCmsSeed.map(normalizeEntry));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error('Invalid journey store format');
    }
    return sortEntriesDesc(parsed.map(normalizeEntry));
  } catch {
    return sortEntriesDesc(journeyCmsSeed.map(normalizeEntry));
  }
}

function writeToStorage(entries) {
  const sorted = sortEntriesDesc(entries.map(normalizeEntry));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
  } catch {
    // Ignore storage quota errors in restricted environments.
  }
  if (channel) {
    try {
      channel.postMessage({ type: 'JOURNEY_UPDATED', timestamp: Date.now() });
    } catch {
      // Ignore broadcast errors.
    }
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENT_NAME));
  }
  return sorted;
}

export const journeyService = {
  getAllEntries() {
    return readFromStorage();
  },

  getPublishedEntries() {
    return readFromStorage().filter((entry) => entry.status === 'published');
  },

  createEntry(payload) {
    const entries = readFromStorage();
    const created = normalizeEntry({
      ...payload,
      id: payload.id || `journey-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      updatedAt: new Date().toISOString()
    });
    const next = writeToStorage([created, ...entries]);
    return { created, entries: next };
  },

  updateEntry(id, patch) {
    const entries = readFromStorage();
    let updated = null;
    const next = entries.map((entry) => {
      if (entry.id !== id) return entry;
      updated = normalizeEntry({
        ...entry,
        ...patch,
        id: entry.id,
        updatedAt: new Date().toISOString()
      });
      return updated;
    });
    return { updated, entries: writeToStorage(next) };
  },

  togglePublish(id) {
    const entries = readFromStorage();
    const target = entries.find((item) => item.id === id);
    if (!target) return { updated: null, entries };
    const nextStatus = target.status === 'published' ? 'draft' : 'published';
    return this.updateEntry(id, { status: nextStatus });
  },

  deleteEntry(id) {
    const entries = readFromStorage();
    const next = entries.filter((entry) => entry.id !== id);
    return writeToStorage(next);
  },

  resetToDefaults() {
    return writeToStorage(journeyCmsSeed);
  },

  importEntries(rawList) {
    if (!Array.isArray(rawList)) {
      throw new Error('Expected an array of journey entries.');
    }
    return writeToStorage(rawList);
  },

  exportEntries() {
    return JSON.stringify(readFromStorage(), null, 2);
  },

  subscribe(callback) {
    const handleUpdate = () => callback(readFromStorage());
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) handleUpdate();
    };

    window.addEventListener(CUSTOM_EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleStorage);
    if (channel) channel.addEventListener('message', handleUpdate);

    return () => {
      window.removeEventListener(CUSTOM_EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleStorage);
      if (channel) channel.removeEventListener('message', handleUpdate);
    };
  }
};
