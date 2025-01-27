let url = "https://catfact.ninja/fact";

let btn = document.querySelector("#factBtn");
let copyBtn = document.querySelector("#copyBtn");
let result = document.querySelector("#result");
let factCard = document.querySelector("#factCard");

btn.addEventListener("click", async () => {
    // Disable the button during loading
    btn.disabled = true;
    btn.innerText = "Loading...";

    let fact = await getFacts();

    // Display the fact inside the card
    result.innerText = fact;
    copyBtn.style.display = 'inline-block'; // Show the copy button

    // Enable the button after fetching
    btn.disabled = false;
    btn.innerText = "Show New Fact";
});

async function getFacts() {
    try {
        let res = await axios.get(url);
        return res.data.fact;
    } catch (e) {
        console.log("error- ", e);
        return "No fact found";
    }
}

// Copy the fact to clipboard
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(result.innerText)
        .then(() => {
            alert("Fact copied to clipboard!");
        })
        .catch(err => {
            console.error("Error copying text: ", err);
        });
});
