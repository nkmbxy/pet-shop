const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? "dev";

export type Status = "Available" | "Reserved" | "Sold";
export type Pet = {
  id: number;
  name: string;
  species: string;
  breed: string;
  ageMonths: number;
  price: number;
  status: Status;
};
export type PetInput = Omit<Pet, "id">;
export type Summary = {
  total: number;
  available: number;
  reserved: number;
  sold: number;
  inventoryValue: number;
  bySpecies: { species: string; count: number }[];
};
export type LoginResult = {
  token: string;
  user: { id: number; username: string; fullName: string; role: string };
};

export const auth = {
  token: () => (typeof window === "undefined" ? null : localStorage.getItem("token")),
  user: (): LoginResult["user"] | null => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },
  save: (r: LoginResult) => {
    localStorage.setItem("token", r.token);
    localStorage.setItem("user", JSON.stringify(r.user));
  },
  clear: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = auth.token();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401 && path !== "/api/auth/login") {
    auth.clear();
    window.location.href = "/login";
    throw new Error("Your session has expired. Please sign in again.");
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const firstError = body.errors ? (Object.values(body.errors)[0] as string[])[0] : undefined;
    throw new Error(body.message ?? firstError ?? "Something went wrong. Please try again.");
  }
  return res.status === 204 ? (undefined as T) : res.json();
}

export const api = {
  login: (username: string, password: string) =>
    request<LoginResult>("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  pets: (search: string, status: string) => {
    const q = new URLSearchParams();
    if (search) q.set("search", search);
    if (status) q.set("status", status);
    return request<Pet[]>(`/api/crud/pets?${q}`);
  },
  summary: () => request<Summary>("/api/crud/summary"),
  createPet: (p: PetInput) => request<Pet>("/api/crud/pets", { method: "POST", body: JSON.stringify(p) }),
  updatePet: (id: number, p: PetInput) => request<Pet>(`/api/crud/pets/${id}`, { method: "PUT", body: JSON.stringify(p) }),
  deletePet: (id: number) => request<void>(`/api/crud/pets/${id}`, { method: "DELETE" }),
};
