import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: "khadoosreactjs-dev.auth0.com",
      clientID: "4MoeNibzlzcaUEEfU9AX32OQDWLy01AI",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile email",
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error}. Check the console for further details`);
        console.log(err);
      }
    });
  };

  setSession(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expiresAt", expiresAt);
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
    return new Date().getTime() < expiresAt;
  };

  logout = () => {
    localStorage.clear();
    this.userProfile = null;
    this.auth0.logout({
      clientID: "4MoeNibzlzcaUEEfU9AX32OQDWLy01AI",
      returnTo: "http://localhost:3000",
    });
  };

  getAccessToken = () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) throw new Error("No access token found.");
    return access_token;
  };

  getProfile = (cb) => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  };
}
