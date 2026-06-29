export interface Activity {

  id: string;

  type: string;

  title: string;

  slug: string;

  timestamp: number;

}

const STORAGE_KEY = "pricelot-activity";

export function getActivity(): Activity[] {

  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  return JSON.parse(stored);

}

export function recordActivity(activity: Activity) {

  const history = getActivity();

  const filtered = history.filter(

    item => item.id !== activity.id

  );

  filtered.unshift(activity);

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(filtered.slice(0,100))

  );

}

export function clearActivity(){

  localStorage.removeItem(STORAGE_KEY);

}