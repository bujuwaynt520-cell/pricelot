import type {
  AccountContentType,
  SavedContentItem,
  User,
  UserProfile,
  UserProgress,
  WatchlistItem,
} from "@/app/types";

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

export interface PasswordResetRequest {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

export interface EmailVerificationRequest {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
}

export interface UserPlatformProvider {
  signUp(email: string, password: string, profile: Partial<UserProfile>): Promise<User>;
  login(email: string, password: string): Promise<AuthSession>;
  logout(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  sendEmailVerification(userId: string): Promise<void>;
  verifyEmail(token: string): Promise<boolean>;
  getCurrentUser(): Promise<User | null>;
  getUserById(userId: string): Promise<User | null>;
  updateProfile(userId: string, profile: Partial<UserProfile>): Promise<User>;
  getSavedContent(userId: string): Promise<SavedContentItem[]>;
  saveContent(userId: string, item: SavedContentItem): Promise<SavedContentItem[]>;
  removeSavedContent(userId: string, savedId: string): Promise<SavedContentItem[]>;
  getWatchlist(userId: string): Promise<WatchlistItem[]>;
  addWatchlistItem(userId: string, item: WatchlistItem): Promise<WatchlistItem[]>;
  removeWatchlistItem(userId: string, itemId: string): Promise<WatchlistItem[]>;
  getProgress(userId: string): Promise<UserProgress[]>;
  recordProgress(progress: Omit<UserProgress, "id" | "isComplete" | "createdAt">): Promise<UserProgress>;
  markProgressComplete(progressId: string): Promise<UserProgress>;
}

interface StoredUserPlatformState {
  users: User[];
  sessions: AuthSession[];
  passwordResets: PasswordResetRequest[];
  emailVerifications: EmailVerificationRequest[];
  savedContent: Record<string, SavedContentItem[]>;
  watchlists: Record<string, WatchlistItem[]>;
  progress: Record<string, UserProgress[]>;
}

const STORAGE_KEY = "pricelot_user_platform_state";
const SESSION_STORAGE_KEY = "pricelot_user_platform_session";

function makeId(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

function loadState(): StoredUserPlatformState {
  if (!isClient()) {
    return {
      users: [],
      sessions: [],
      passwordResets: [],
      emailVerifications: [],
      savedContent: {},
      watchlists: {},
      progress: {},
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        users: [],
        sessions: [],
        passwordResets: [],
        emailVerifications: [],
        savedContent: {},
        watchlists: {},
        progress: {},
      };
    }

    return JSON.parse(raw) as StoredUserPlatformState;
  } catch {
    return {
      users: [],
      sessions: [],
      passwordResets: [],
      emailVerifications: [],
      savedContent: {},
      watchlists: {},
      progress: {},
    };
  }
}

function saveState(state: StoredUserPlatformState) {
  if (!isClient()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getCurrentSessionToken(): string | null {
  if (!isClient()) {
    return null;
  }
  return window.sessionStorage.getItem(SESSION_STORAGE_KEY);
}

function setCurrentSessionToken(token: string | null) {
  if (!isClient()) {
    return;
  }

  if (token) {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, token);
  } else {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
  }
}

function hashPassword(password: string): string {
  return `hash:${password}`;
}

function ensureUserProfile(profile?: Partial<UserProfile>): UserProfile {
  return {
    firstName: profile?.firstName || "Trader",
    lastName: profile?.lastName || "User",
    displayName: profile?.displayName || `${profile?.firstName || "Trader"} ${profile?.lastName || "User"}`,
    bio: profile?.bio,
    avatarUrl: profile?.avatarUrl,
    location: profile?.location,
    timezone: profile?.timezone,
    favoriteMarkets: profile?.favoriteMarkets || [],
    newsletterOptIn: profile?.newsletterOptIn ?? true,
    preferredAssets: profile?.preferredAssets || ["Forex"],
  };
}

function getEntityCollection<K extends keyof StoredUserPlatformState>(state: StoredUserPlatformState, key: K): StoredUserPlatformState[K] {
  return state[key];
}

export class LocalUserPlatformProvider implements UserPlatformProvider {
  async signUp(email: string, password: string, profile: Partial<UserProfile>): Promise<User> {
    const state = loadState();
    const existing = state.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error("A user with that email already exists.");
    }

    const user: User = {
      id: makeId("user"),
      email,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString(),
      emailVerified: false,
      profile: ensureUserProfile(profile),
      roles: ["member"],
      preferences: {
        darkMode: false,
        locale: "en-US",
      },
    };

    state.users.push(user);
    state.savedContent[user.id] = [];
    state.watchlists[user.id] = [];
    state.progress[user.id] = [];
    saveState(state);

    await this.sendEmailVerification(user.id);
    return user;
  }

  async login(email: string, password: string): Promise<AuthSession> {
    const state = loadState();
    const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error("Invalid email or password.");
    }

    const session: AuthSession = {
      id: makeId("session"),
      userId: user.id,
      token: makeId("token"),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    };

    state.sessions = state.sessions.filter((existing) => existing.userId !== user.id);
    state.sessions.push(session);
    saveState(state);

    setCurrentSessionToken(session.token);
    return session;
  }

  async logout(): Promise<void> {
    if (!isClient()) {
      return;
    }

    const token = getCurrentSessionToken();
    if (!token) {
      return;
    }

    const state = loadState();
    state.sessions = state.sessions.filter((session) => session.token !== token);
    saveState(state);
    setCurrentSessionToken(null);
  }

  async requestPasswordReset(email: string): Promise<void> {
    const state = loadState();
    const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return;
    }

    const resetRequest: PasswordResetRequest = {
      id: makeId("reset"),
      userId: user.id,
      token: makeId("reset-token"),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    };

    state.passwordResets = state.passwordResets.filter((record) => record.userId !== user.id);
    state.passwordResets.push(resetRequest);
    saveState(state);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const state = loadState();
    const request = state.passwordResets.find((record) => record.token === token);
    if (!request || new Date(request.expiresAt) < new Date()) {
      throw new Error("Invalid or expired password reset token.");
    }

    const user = state.users.find((item) => item.id === request.userId);
    if (!user) {
      throw new Error("User not found for password reset.");
    }

    user.passwordHash = hashPassword(newPassword);
    state.passwordResets = state.passwordResets.filter((record) => record.token !== token);
    saveState(state);
  }

  async sendEmailVerification(userId: string): Promise<void> {
    const state = loadState();
    const user = state.users.find((item) => item.id === userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const verification: EmailVerificationRequest = {
      id: makeId("verify"),
      userId: user.id,
      token: makeId("verify-token"),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    };

    state.emailVerifications = state.emailVerifications.filter((record) => record.userId !== user.id);
    state.emailVerifications.push(verification);
    saveState(state);
  }

  async verifyEmail(token: string): Promise<boolean> {
    const state = loadState();
    const record = state.emailVerifications.find((entry) => entry.token === token);
    if (!record || new Date(record.expiresAt) < new Date()) {
      return false;
    }

    const user = state.users.find((item) => item.id === record.userId);
    if (!user) {
      return false;
    }

    user.emailVerified = true;
    state.emailVerifications = state.emailVerifications.filter((entry) => entry.token !== token);
    saveState(state);
    return true;
  }

  async getCurrentUser(): Promise<User | null> {
    if (!isClient()) {
      return null;
    }

    const token = getCurrentSessionToken();
    if (!token) {
      return null;
    }

    const state = loadState();
    const session = state.sessions.find((item) => item.token === token);
    if (!session) {
      return null;
    }

    return state.users.find((item) => item.id === session.userId) || null;
  }

  async getUserById(userId: string): Promise<User | null> {
    const state = loadState();
    return state.users.find((item) => item.id === userId) || null;
  }

  async updateProfile(userId: string, profile: Partial<UserProfile>): Promise<User> {
    const state = loadState();
    const user = state.users.find((item) => item.id === userId);
    if (!user) {
      throw new Error("User not found.");
    }

    user.profile = {
      ...user.profile,
      ...profile,
      displayName: profile.displayName || user.profile.displayName,
      favoriteMarkets: profile.favoriteMarkets || user.profile.favoriteMarkets,
      preferredAssets: profile.preferredAssets || user.profile.preferredAssets,
    };

    saveState(state);
    return user;
  }

  async getSavedContent(userId: string): Promise<SavedContentItem[]> {
    const state = loadState();
    return state.savedContent[userId] ?? [];
  }

  async saveContent(userId: string, item: SavedContentItem): Promise<SavedContentItem[]> {
    const state = loadState();
    const collection = state.savedContent[userId] ?? [];
    const replaced = collection.filter((saved) => saved.id !== item.id);
    state.savedContent[userId] = [item, ...replaced];
    saveState(state);
    return state.savedContent[userId];
  }

  async removeSavedContent(userId: string, savedId: string): Promise<SavedContentItem[]> {
    const state = loadState();
    const collection = state.savedContent[userId] ?? [];
    state.savedContent[userId] = collection.filter((item) => item.id !== savedId);
    saveState(state);
    return state.savedContent[userId];
  }

  async getWatchlist(userId: string): Promise<WatchlistItem[]> {
    const state = loadState();
    return state.watchlists[userId] ?? [];
  }

  async addWatchlistItem(userId: string, item: WatchlistItem): Promise<WatchlistItem[]> {
    const state = loadState();
    const collection = state.watchlists[userId] ?? [];
    const updated = [item, ...collection.filter((existing) => existing.id !== item.id)];
    state.watchlists[userId] = updated;
    saveState(state);
    return updated;
  }

  async removeWatchlistItem(userId: string, itemId: string): Promise<WatchlistItem[]> {
    const state = loadState();
    const collection = state.watchlists[userId] ?? [];
    state.watchlists[userId] = collection.filter((item) => item.id !== itemId);
    saveState(state);
    return state.watchlists[userId];
  }

  async getProgress(userId: string): Promise<UserProgress[]> {
    const state = loadState();
    return state.progress[userId] ?? [];
  }

  async recordProgress(progress: Omit<UserProgress, "id" | "createdAt"> & { isComplete?: boolean }): Promise<UserProgress> {
    const state = loadState();
    const userProgress = state.progress[progress.userId] ?? [];
    const existing = userProgress.find((item) => item.referenceId === progress.referenceId && item.contentType === progress.contentType);
    const completed = progress.isComplete || progress.progressPercentage >= 100;

    if (existing) {
      existing.progressPercentage = Math.max(existing.progressPercentage, progress.progressPercentage);
      existing.completedAt = completed ? new Date().toISOString() : existing.completedAt;
      existing.isComplete = completed;
      existing.lastViewedAt = progress.lastViewedAt || existing.lastViewedAt;
      saveState(state);
      return existing;
    }

    const newProgress: UserProgress = {
      id: makeId("progress"),
      ...progress,
      createdAt: new Date().toISOString(),
      isComplete: completed,
      completedAt: completed ? new Date().toISOString() : undefined,
    };

    state.progress[progress.userId] = [newProgress, ...(state.progress[progress.userId] ?? [])];
    saveState(state);
    return newProgress;
  }

  async markProgressComplete(progressId: string): Promise<UserProgress> {
    const state = loadState();
    const allProgress = Object.values(state.progress).flat();
    const target = allProgress.find((item) => item.id === progressId);
    if (!target) {
      throw new Error("Progress entry not found.");
    }

    target.isComplete = true;
    target.progressPercentage = 100;
    target.completedAt = new Date().toISOString();
    saveState(state);
    return target;
  }
}

export const userPlatformProvider = new LocalUserPlatformProvider();

export function getAuthContentTypeLabel(type: AccountContentType) {
  return type === "BrokerReview" ? "Broker Review" : type;
}
