
export function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token"); // This will be null if not found
    const email = params.get("email"); // Similarly for email
    return { accessToken, email }; // Return an object with accessToken and email (both may be null)
}