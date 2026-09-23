export const STORAGE_KEY = 'rmp-application-plan-v1'
export const EVENT_NAME = 'rmp-application-plan-change'

let memoryPlan = { favorites: [], targets: [], tasks: {}, notes: {} }

export function emptyPlan() {
  return { favorites: [], targets: [], tasks: {}, notes: {} }
}

export function normalizePlan(value) {
  const plan = value && typeof value === 'object' ? value : {}
  return {
    favorites: Array.isArray(plan.favorites) ? plan.favorites : [],
    targets: Array.isArray(plan.targets) ? plan.targets : [],
    tasks: plan.tasks && typeof plan.tasks === 'object' ? plan.tasks : {},
    notes: plan.notes && typeof plan.notes === 'object' ? plan.notes : {},
  }
}

export function readPlan() {
  if (typeof window === 'undefined') return emptyPlan()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) memoryPlan = normalizePlan(JSON.parse(raw))
  } catch {
    // Safari private browsing / restricted storage: keep a session-only fallback.
  }
  return normalizePlan(memoryPlan)
}

export function writePlan(plan) {
  const normalized = normalizePlan(plan)
  memoryPlan = normalized
  let persisted = false
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
      persisted = true
    } catch {
      // Keep the plan usable for this tab even if persistent storage is unavailable.
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { persisted } }))
  }
  return persisted
}
