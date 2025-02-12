// Function to filter clients based on search query
function filterClients() {
    const searchQuery = document.getElementById("searchBar").value.trim().toLowerCase(); // Trim whitespace
    const rows = document.querySelectorAll("#customerTable tbody tr");

    rows.forEach((row) => {
        const clientName = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        // Check if the search query matches the client name
        row.style.display = clientName.includes(searchQuery) ? "" : "none";
    });
}

// Attach event listener for real-time filtering
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", filterClients); // Listen for input events
    } else {
        console.error("Search bar element with ID 'searchBar' not found.");
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const sidebarBtn = document.getElementById("sidebarbtn");

    // Toggle sidebar on button click
    sidebarBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Optional: Close sidebar if clicking outside of it
    window.addEventListener("click", (event) => {
        if (
            !sidebar.contains(event.target) &&
            event.target !== sidebarBtn &&
            sidebar.classList.contains("open")
        ) {
            sidebar.classList.remove("open");
        }
    });
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");

    sidebar.classList.toggle("open");

    // Adjust main content margin when sidebar is opened/closed on larger screens
    if (window.innerWidth > 768) {
        mainContent.style.marginLeft = sidebar.classList.contains("open") ? "250px" : "0";
    }
}

// Close the sidebar when clicking outside of it on smaller screens
window.onclick = function (event) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar.contains(event.target) && !event.target.matches('.openbtn')) {
        sidebar.classList.remove("open");
    }
};

// Function to load clients from local storage and populate the table
function loadClients() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    const tableBody = document.querySelector("#customerTable tbody");

    console.log("Clients:", clients); // Debugging statement
    console.log("Orders:", orders); // Debugging statement

    // Sort clients based on the most recent order date
    clients.sort((a, b) => {
        const lastOrderA =
            orders[a.name] && orders[a.name].length > 0
                ? new Date(orders[a.name][orders[a.name].length - 1].date)
                : new Date(0);
        const lastOrderB =
            orders[b.name] && orders[b.name].length > 0
                ? new Date(orders[b.name][orders[b.name].length - 1].date)
                : new Date(0);
        return lastOrderB - lastOrderA;
    });

    // Clear existing rows
    tableBody.innerHTML = "";

    // Populate the table with client names and locations
    clients.forEach((client, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td>
                         <td><a href="customerData.html?client=${client.name}" class="customer-link" data-client="${client.name}">${client.name}</a></td>
                         <td>${client.location}</td>`;
        tableBody.appendChild(row);
    });
}
// Load clients when the page is loaded
window.onload = function () {
    loadClients();
};