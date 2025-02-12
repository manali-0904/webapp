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
// Sidebar Toggle Functionality
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
window.onclick = function(event) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar.contains(event.target) && !event.target.matches('.openbtn')) {
        sidebar.classList.remove("open");
    }

    // Close modal if clicked outside the modal content
    const modal = document.getElementById("formModal");
    const customerModal = document.getElementById("customerFormModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == customerModal) {
        customerModal.style.display = "none";
    }
};

// Ornament Style Update Logic
 function updateStyleOptions() {
            const ornament = document.getElementById('Ornament').value; // Get selected ornament type
            const styleDropdown = document.getElementById('style'); // Get style dropdown
            styleDropdown.innerHTML = '<option value="" disabled selected>Select style</option>'; // Reset options

            let styles = []; // Array to hold styles based on ornament selection

            if (ornament === 'Beeds') {
                styles = ['गोल', ' उभे', 'किरण', 'अष्टपैलू', 'फुटबॉल', 'घागरी', 'पटतास'];
            } else if (ornament === 'Ear piercing') {
                styles = ['झुमका', 'रिंग', 'कानचैन', 'टॉप'];
            } else if (ornament === 'Neck jewel') {
                styles = ['चैन', 'मंगळसूत्र', 'नेकलेस', 'पेंडंट', 'मणीमाळ', 'ठुशी'];
            } else if (ornament === 'Ring') {
                styles = ['पुरुष', 'महिला'];
            } else if (ornament === 'Wrist jewel') {
                styles = ['बांगडी', 'कड', 'ब्रेसलेट'];
            } else if (ornament === 'Ankle jewel') {
                styles = ['चैन', 'पैंजण'];
            } else if (ornament === 'Waist jewel') {
                styles = ['कंबर साखळी', 'कंबरपट्टा'];
            }

            styles.forEach(style => {
                const newOption = document.createElement('option');
                newOption.value = style.toLowerCase().replace(/\s+/g, '-'); // URL-safe formatting
                newOption.textContent = style;
                styleDropdown.appendChild(newOption);
            });
        }
// Calculate Net Weight and Profit
function calculateNetWeightAndProfit() {
    const grossWeight = parseFloat(document.getElementById('weight').value) || 0;
    const purity = parseFloat(document.getElementById('purity').value) || 0;
    const wastage = parseFloat(document.getElementById('wastage').value) || 0;

    // Calculate Net Weight
    const netWeight = (purity / 100) * grossWeight;
    document.getElementById('netWeight').value = netWeight.toFixed(3);

    // Calculate Profit
    const profit = (wastage / 100) * netWeight;
    document.getElementById('profit').value = profit.toFixed(3);
}

// Add event listeners to calculate Net Weight and Profit
document.getElementById('weight').addEventListener('input', calculateNetWeightAndProfit);
document.getElementById('purity').addEventListener('change', calculateNetWeightAndProfit);
document.getElementById('wastage').addEventListener('input', calculateNetWeightAndProfit);

// Modal functionality for new order form
const modal = document.getElementById("formModal");
const toggleButton = document.getElementById("toggleForm");
const closeModal = document.getElementById("closeModal");

toggleButton.onclick = function() {
    modal.style.display = "block";
}

closeModal.onclick = function() {
    modal.style.display = "none";
}

// Customer modal functionality
const customerModal = document.getElementById("customerFormModal");
const toggleCustomerButton = document.getElementById("toggleCustomerForm");
const closeCustomerModal = document.getElementById("closeCustomerModal");

toggleCustomerButton.onclick = function() {
    customerModal.style.display = "block";
}

closeCustomerModal.onclick = function() {
    customerModal.style.display = "none";
}

// Customer form submission for new customer
document.getElementById("customerForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    const newClientName = document.getElementById("newClientName").value.trim(); // Get the client name
    const location = document.getElementById("location").value.trim(); // Get the location
    console.log("New client name submitted:", newClientName);

    // Store the client name and location in local storage
    const clients = JSON.parse(localStorage.getItem("clients")) || []; // Get existing clients or initialize an empty array
    if (newClientName && !clients.some(client => client.name === newClientName)) { // Check for duplicates and non-empty
        clients.push({ name: newClientName, location: location }); // Add the new client name and location
        localStorage.setItem("clients", JSON.stringify(clients)); // Save back to local storage
    }
    console.log(clients);

    // Optionally, you can clear the form fields after submission
    document.getElementById("customerForm").reset();
    customerModal.style.display = "none"; // Close the customer form modal
    loadClients(); // Reload clients to update the table
};

// Order form submission
document.getElementById("orderForm").onsubmit = function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get client name from new order form
    const clientName = document.getElementById("name").value.trim(); // Trim whitespace

    // Check if client name is not empty
    if (clientName === "") {
        console.log("Client name cannot be empty."); // Log if the name is empty
        return; // Exit the function if the client name is empty
    }

    // Create order data object
    const orderData = {
        date: document.getElementById("date").value,
        ornamentType: document.getElementById("Ornament").value,
        style: document.getElementById("style").value,
        goldSource: document.querySelector('input[name="goldSource"]:checked').value,
        wastage: document.getElementById("wastage").value,
        purity: document.getElementById("purity").value,
        grossWeight: document.getElementById("weight").value,
        netWeight: document.getElementById("netWeight").value,
        profit: document.getElementById("profit").value,
    };

    // Store the order in local storage
    const orders = JSON.parse(localStorage.getItem("orders")) || {};
    console.log("Clients in local storage:", JSON.parse(localStorage.getItem("clients")));
    // Initialize the client entry if it doesn't exist
    if (!orders[clientName]) {
        orders[clientName] = []; // Create an array for the client if it doesn't exist
    }

    // Push the new order data into the client's orders array
    orders[clientName].push(orderData);

    // Save the updated orders back to local storage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Optionally, you can clear the form fields after submission
    document.getElementById("orderForm").reset(); // Clear the form fields
    console.log("Order submitted for client:", clientName); // Log the submission
    modal.style.display = "none"; // Close the order form modal
};

// Load clients when the page is loaded
window.onload = function() {
    loadClients();
    loadDataFromLocalStorage();
    loadTotals();
};

function loadClients() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const clientTable = document.getElementById("clientTable");
    const clientNamesDatalist = document.getElementById("clientNames");
    clientTable.innerHTML = ""; // Clear existing table content
    clientNamesDatalist.innerHTML = ""; // Clear existing datalist options

    clients.forEach(client => {
        // Populate the table
        const row = clientTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = client.name;
        cell2.textContent = client.location;

        // Populate the datalist
        const option = document.createElement("option");
        option.value = client.name;
        clientNamesDatalist.appendChild(option);
    });
}

// Function to load data from local storage and display it
function loadDataFromLocalStorage() {
    // Load saved gold
    const savedGold = JSON.parse(localStorage.getItem("savedGold")) || [];
    const savedGoldContainer = document.getElementById("savedGoldValue");
    savedGoldContainer.textContent = savedGold.reduce((total, item) => total + Number(item.weight), 0) + " gm";

    // Load pending gold
    const pendingGold = JSON.parse(localStorage.getItem("pendingGold")) || [];
    const pendingGoldContainer = document.getElementById("pendingGoldValue");
    pendingGoldContainer.textContent = pendingGold.reduce((total, item) => total + Number(item.weight), 0) + " gm";

    // Load pending money
    const pendingMoney = JSON.parse(localStorage.getItem("pendingMoney")) || [];
    const pendingMoneyContainer = document.getElementById("pendingMoneyValue");
    pendingMoneyContainer.textContent = pendingMoney.reduce((total, item) => total + Number(item.amount), 0) + " ₹";

    // Load to-do list
    const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
    const todoListContainer = document.getElementById("todoList");
    todoListContainer.innerHTML = ""; // Clear existing list
    todoList.forEach(task => {
        const listItem = createTodoListItem(task.text, task.completed);
        todoListContainer.appendChild(listItem);
    });
}

// Function to create a to-do list item
function createTodoListItem(text, completed = false) {
    const listItem = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
        listItem.classList.toggle("completed", checkbox.checked);
        saveTodoListToLocalStorage();
    });

    // Text content
    const textContent = document.createElement("span");
    textContent.textContent = text;
    if (completed) {
        listItem.classList.add("completed");
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
        listItem.remove();
        saveTodoListToLocalStorage();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(textContent);
    listItem.appendChild(deleteBtn);

    return listItem;
}

// Function to save to-do list to local storage
function saveTodoListToLocalStorage() {
    const todoList = [];
    document.querySelectorAll("#todoList li").forEach(item => {
        const text = item.querySelector("span").textContent;
        const completed = item.querySelector("input[type='checkbox']").checked;
        todoList.push({ text, completed });
    });
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Event listener for to-do form submission
document.getElementById("todoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const todoInput = document.getElementById("todoInput");
    const text = todoInput.value.trim();
    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const listItem = createTodoListItem(text);
    document.getElementById("todoList").appendChild(listItem);
    saveTodoListToLocalStorage();
    todoInput.value = "";
});

// Function to load totals from local storage
function loadTotals() {
    const savedGoldTotal = parseFloat(localStorage.getItem("savedGoldTotal")) || 0;
    const pendingGoldTotal = parseFloat(localStorage.getItem("pendingGoldTotal")) || 0;
    const pendingMoneyTotal = parseFloat(localStorage.getItem("pendingMoneyTotal")) || 0;

    document.getElementById("savedGoldValue").textContent = savedGoldTotal.toFixed(2) + " gm";
    document.getElementById("pendingGoldValue").textContent = pendingGoldTotal.toFixed(2) + " gm";
    document.getElementById("pendingMoneyValue").textContent = "₹ " + pendingMoneyTotal.toFixed(0);
}

// Load data when the page is loaded
window.onload = function() {
    loadDataFromLocalStorage();
    loadTotals();
};