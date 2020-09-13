const API_BASE = 'https://tager.dev.ozitag.com/api/';
const API_STORAGE_NAME = 'ozitag-user';

class Api {
  constructor() {
    this.token = null;
    this.expiresAt = null;
    this.refreshToken = null;
    this.tokenType = null;

    try {
      const data = JSON.parse(localStorage.getItem(API_STORAGE_NAME));

      if (data.expiresAt && new Date(data.expiresAt) > new Date()) {
        this.token = data.token;
        this.expiresAt = data.expiresAt;
        this.refreshToken = data.refreshToken;
        this.tokenType = data.tokenType;
      }
    } catch {
      // empty
    }
  }

  async _fetch(method, endpoint, body, authRetry) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.token ? `${this.tokenType} ${this.token}` : undefined,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let res;

    try {
      res = await response.json();
    } catch {
      // empty
    }

    if (!response.ok) {
      // Condition for checking if token is expired
      if (authRetry && response.status === 401) {
        await this._getAccessToken();
        return this._fetch(method, endpoint, body);
      }

      throw new Error(res?.message ?? 'Something went wrong');
    }

    return res.data;
  }

  isLoggedIn() {
    return !!this.token && (new Date(this.expiresAt) > new Date());
  }

  async login(email, password) {
    const res = await this._fetch('POST', 'auth/user', {
      email,
      password,
      clientId: 1,
    });

    this.token = res.accessToken;
    this.expiresAt = res.expiresAt;
    this.refreshToken = res.refreshToken;
    this.tokenType = res.tokenType;

    localStorage.setItem(API_STORAGE_NAME, JSON.stringify({
      token: res.accessToken,
      expiresAt: res.expiresAt,
      refreshToken: res.refreshToken,
      tokenType: res.tokenType,
    }));
  }

  async logout() {
    await this._fetch('POST', 'user/profile/logout');

    this.token = null;
    this.expiresAt = null;
    this.refreshToken = null;
    this.tokenType = null;

    localStorage.removeItem(API_STORAGE_NAME);
  }

  // Method to get new token (only for demostrating because of unreal endpoint)
  async _getAccessToken() {
    const res = await this._fetch('POST', 'user/profile/token', { refreshToken: this.refreshToken });

    this.token = res.accessToken;
    this.expiresAt = res.expiresAt;

    localStorage.setItem(API_STORAGE_NAME, JSON.stringify({
      token: res.accessToken,
      expiresAt: res.expiresAt,
      refreshToken: this.refreshToken,
    }));
  }

  getProfileInfo() {
    return this._fetch('GET', 'user/profile', null, true);
  }
}

export default new Api();
