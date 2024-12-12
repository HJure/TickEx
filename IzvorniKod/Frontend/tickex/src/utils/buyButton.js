export function handleBuyClick(data) {
    const email = localStorage.getItem("email");
    const id = null;

    // First get userID by his email
    fetch(`http://localhost:8080/users/getId?email=${email}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
    .then((idKor) => {
        console.log("User ID from backend:", idKor);
        id = idKor;
    })
    .catch((error) => {
        console.error("Error fetching user ID:", error);
    });

    // Buy ticket
    fetch(`http://localhost:8080/shop/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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