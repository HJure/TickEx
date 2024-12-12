
export function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const email = params.get("email");
    return { accessToken, email };
}