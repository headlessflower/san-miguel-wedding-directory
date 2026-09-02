export type QuicklistVenue = {
  id: string;
  slug: string;
  name: string;
  email?: string;
  website?: string;
};

export type QuicklistVendor = QuicklistVenue & {
  categorySlug: string;
};

export type QuicklistTask = {
  id: string;
  label: string;
  done: boolean;
};

const STORAGE_KEY = "san-miguel-wedding-quicklist-v1";

export function useQuicklist() {
  const venues = useState<QuicklistVenue[]>("quicklist-venues", () => []);
  const vendors = useState<QuicklistVendor[]>("quicklist-vendors", () => []);
  const tasks = useState<QuicklistTask[]>("quicklist-tasks", () => []);
  const ready = useState<boolean>("quicklist-ready", () => false);

  function save() {
    if (!import.meta.client || !ready.value) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ venues: venues.value, vendors: vendors.value, tasks: tasks.value }));
  }

  function initialize() {
    if (!import.meta.client || ready.value) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        venues.value = Array.isArray(data.venues) ? data.venues : [];
        vendors.value = Array.isArray(data.vendors) ? data.vendors : [];
        tasks.value = Array.isArray(data.tasks) ? data.tasks : [];
      }
    } catch {
      // Unavailable or malformed browser storage simply starts an empty list.
    }
    ready.value = true;
  }

  const isSaved = (id: string) => venues.value.some((venue) => venue.id === id);
  const isVendorSaved = (id: string) => vendors.value.some((vendor) => vendor.id === id);

  function toggleVenue(venue: QuicklistVenue) {
    const index = venues.value.findIndex((item) => item.id === venue.id);
    if (index >= 0) venues.value.splice(index, 1);
    else venues.value.push(venue);
    save();
  }

  function removeVenue(id: string) {
    venues.value = venues.value.filter((venue) => venue.id !== id);
    save();
  }

  function toggleVendor(vendor: QuicklistVendor) {
    const index = vendors.value.findIndex((item) => item.id === vendor.id);
    if (index >= 0) vendors.value.splice(index, 1);
    else vendors.value.push(vendor);
    save();
  }

  function removeVendor(id: string) {
    vendors.value = vendors.value.filter((vendor) => vendor.id !== id);
    save();
  }

  function addTask(label: string) {
    const trimmed = label.trim();
    if (!trimmed) return;
    tasks.value.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, label: trimmed, done: false });
    save();
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((item) => item.id === id);
    if (task) task.done = !task.done;
    save();
  }

  function removeTask(id: string) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
    save();
  }

  return { venues, vendors, tasks, initialize, isSaved, isVendorSaved, toggleVenue, toggleVendor, removeVenue, removeVendor, addTask, toggleTask, removeTask };
}
