export function handleBuyClick(data) {
    const id = localStorage.getItem("userID");
    const access_token = localStorage.getItem("access_token");
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
    console.log(data)

    // Buy ticket
    fetch(`${backendUrl}/api/shop/${id}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
    if (response.ok) {
        alert("Purchase successful!");
        return response.json();
    } else {
        alert("Something went wrong!");
        throw new Error("Failed to purchase ticket.");
    }
    })
    .catch((error) => console.error("Error:", error));
}