import { useState, useEffect, useMemo, useCallback } from 'react';
import { JOURNEY_CATEGORIES } from '../data/journeyCmsSeed';
import { journeyService } from '../services/journeyService';

export function useJourneyCms({ onlyPublished = false } = {}) {
  const [allEntries, setAllEntries] = useState(() => journeyService.getAllEntries());

  useEffect(() => {
    setAllEntries(journeyService.getAllEntries());
    return journeyService.subscribe((nextEntries) => {
      setAllEntries(nextEntries);
    });
  }, []);

  const entries = useMemo(
    () => (onlyPublished ? allEntries.filter((entry) => entry.status === 'published') : allEntries),
    [allEntries, onlyPublished]
  );

  const publishedEntries = useMemo(
    () => allEntries.filter((entry) => entry.status === 'published'),
    [allEntries]
  );

  const categoryCounts = useMemo(() => {
    const counts = { All: entries.length };
    for (const cat of JOURNEY_CATEGORIES) {
      counts[cat.id] = 0;
    }
    for (const entry of entries) {
      counts[entry.category] = (counts[entry.category] || 0) + 1;
    }
    return counts;
  }, [entries]);

  const createEntry = useCallback((payload) => {
    const result = journeyService.createEntry(payload);
    setAllEntries(result.entries);
    return result.created;
  }, []);

  const updateEntry = useCallback((id, patch) => {
    const result = journeyService.updateEntry(id, patch);
    setAllEntries(result.entries);
    return result.updated;
  }, []);

  const togglePublish = useCallback((id) => {
    const result = journeyService.togglePublish(id);
    setAllEntries(result.entries);
    return result.updated;
  }, []);

  const deleteEntry = useCallback((id) => {
    const next = journeyService.deleteEntry(id);
    setAllEntries(next);
  }, []);

  const resetToDefaults = useCallback(() => {
    const next = journeyService.resetToDefaults();
    setAllEntries(next);
  }, []);

  const importEntries = useCallback((rawList) => {
    const next = journeyService.importEntries(rawList);
    setAllEntries(next);
  }, []);

  return {
    entries,
    allEntries,
    publishedEntries,
    categoryCounts,
    createEntry,
    updateEntry,
    togglePublish,
    deleteEntry,
    resetToDefaults,
    importEntries
  };
}
