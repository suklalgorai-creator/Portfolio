import { useState } from 'react';

const initialSubjects = [
  { id: 'dsa', name: 'Data Structures & C', attended: 22, total: 25 },
  { id: 'flutter', name: 'Mobile App Dev Lab', attended: 19, total: 20 },
  { id: 'math', name: 'Engineering Mathematics', attended: 16, total: 21 }
];

export function useAttendanceSim() {
  const [subjects, setSubjects] = useState(initialSubjects);

  const markPresent = (id) => {
    setSubjects(prev =>
      prev.map(sub =>
        sub.id === id
          ? { ...sub, attended: sub.attended + 1, total: sub.total + 1 }
          : sub
      )
    );
  };

  const markAbsent = (id) => {
    setSubjects(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, total: sub.total + 1 } : sub
      )
    );
  };

  const totalAttended = subjects.reduce((sum, s) => sum + s.attended, 0);
  const totalClasses = subjects.reduce((sum, s) => sum + s.total, 0);
  const overallPercentage = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  const subjectsWithStats = subjects.map(sub => {
    const pct = sub.total > 0 ? Math.round((sub.attended / sub.total) * 100) : 0;
    const isSafe = pct >= 75;
    const canBunk = Math.max(0, Math.floor((sub.attended - 0.75 * sub.total) / 0.75));
    const needed = Math.ceil((0.75 * sub.total - sub.attended) / 0.25);
    const hint = isSafe
      ? `Safe • Can bunk ${canBunk} class(es)`
      : `Attend next ${needed} class(es) for 75%`;

    return {
      ...sub,
      percentage: pct,
      isSafe,
      hint
    };
  });

  return {
    subjects: subjectsWithStats,
    overallPercentage,
    markPresent,
    markAbsent
  };
}
