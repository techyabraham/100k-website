import { INITIAL_SLOTS, SLOT_STORAGE_KEY } from "../constants";

export const getSlotsRemaining = () => {
  try {
    const stored = localStorage.getItem(SLOT_STORAGE_KEY);
    if (stored === null) {
      localStorage.setItem(SLOT_STORAGE_KEY, String(INITIAL_SLOTS));
      return INITIAL_SLOTS;
    }
    const parsed = Number.parseInt(stored, 10);
    return Number.isFinite(parsed) ? Math.max(0, parsed) : INITIAL_SLOTS;
  } catch {
    return INITIAL_SLOTS;
  }
};

export const decrementSlot = () => {
  const current = getSlotsRemaining();
  const decremented = Math.max(0, current - 1);
  const next = decremented === 9 ? 5 : decremented;
  try {
    localStorage.setItem(SLOT_STORAGE_KEY, String(next));
  } catch {
    // Some private browsing modes block localStorage; the UI still proceeds.
  }
  return next;
};

// TO RESET SLOT COUNTER FOR NEW ROUND:
// Open browser console on the live site and run:
// localStorage.setItem('abraham_slots_remaining', '10'); location.reload();
// Run this once after deploying to start the new round at 10 slots.
