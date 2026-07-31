// Access Token
export function getAccessToken() {

    return localStorage.getItem("access");

}

export function setAccessToken(token) {

    localStorage.setItem("access", token);

}

export function removeAccessToken() {

    localStorage.removeItem("access");

}

// Refresh Token
export function getRefreshToken() {

    return localStorage.getItem("refresh");

}

export function setRefreshToken(token) {

    localStorage.setItem("refresh", token);

}

export function removeRefreshToken() {

    localStorage.removeItem("refresh");

}

// Remove All Tokens
export function clearTokens() {

    removeAccessToken();

    removeRefreshToken();

}