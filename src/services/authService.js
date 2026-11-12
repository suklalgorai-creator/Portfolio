const SESSION_KEY = 'sg_cms_admin_session_v1';

const CONFIGURED_PASSCODE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CMS_PASSCODE) ||
  'studio2026';

const CONFIGURED_ADMIN_NAME =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CMS_ADMIN_NAME) ||
  'Suklal Gorai';

export const authService = {
  getDefaultPasscodeHint() {
    return CONFIGURED_PASSCODE === 'studio2026' ? 'studio2026' : null;
  },

  getSession() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.authenticated) return null;
      return parsed;
    } catch {
      return null;
    }
  },

  isAuthenticated() {
    return Boolean(this.getSession()?.authenticated);
  },

  signIn({ username = CONFIGURED_ADMIN_NAME, passcode }) {
    const trimmedPasscode = String(passcode || '').trim();
    if (!trimmedPasscode) {
      return { ok: false, error: 'Please enter the admin passcode.' };
    }
    if (trimmedPasscode !== CONFIGURED_PASSCODE) {
      return { ok: false, error: 'Incorrect passcode. Please try again.' };
    }

    const session = {
      authenticated: true,
      username: String(username || CONFIGURED_ADMIN_NAME).trim() || CONFIGURED_ADMIN_NAME,
      signedInAt: new Date().toISOString()
    };

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // Session remains active for current memory context if storage is blocked.
    }
    return { ok: true, session };
  },

  signOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // Ignore storage errors.
    }
  }
};
