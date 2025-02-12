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
// Function to format date to dd.mm.yyyy
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Function to load customer data from local storage
function loadCustomerData() {
    const urlParams = new URLSearchParams(window.location.search);
    const clientName = urlParams.get('client');
    document.getElementById('clientName').textContent = `Orders for ${clientName}`;

    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    console.log('Orders:', orders); // Debugging statement
    const orderTableBody = document.querySelector('#orderTable tbody');
    const totalProfitDisplay = document.getElementById('totalProfit');
     const totalGrossWeightDisplay = document.getElementById('totalGrossWeight');
      let totalProfit = 0;
      let totalGrossWeight = 0;
    orderTableBody.innerHTML = ""; // Clear existing rows

    if (orders[clientName] && orders[clientName].length > 0) {
        // Filter out orders without a valid date
        const validOrders = orders[clientName].filter(order => order.date);
        console.log('Valid Orders:', validOrders); // Debugging statement
        validOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        validOrders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formatDate(order.date)}</td>
                <td>${order.ornamentType}</td>
                <td>${order.style}</td>
                <td>${order.goldSource}</td>
                <td>${order.wastage}</td>
                <td>${order.purity}</td>
                <td>${order.grossWeight}</td>
                <td>${order.netWeight}</td>
                <td>${order.profit}</td>
                <td><button style="background-color: #bd2c2c; color: white;" onclick="deleteOrder('${clientName}', ${index})">Delete</button></td>
            `;
            orderTableBody.appendChild(row);
            totalProfit += parseFloat(order.profit);
            totalGrossWeight += parseFloat(order.grossWeight) || 0;
        });
    } else {
        orderTableBody.innerHTML = `<tr><td colspan="10">No orders found for this customer.</td></tr>`;
    }
    totalProfitDisplay.textContent = totalProfit.toFixed(4);
    totalGrossWeightDisplay.textContent = totalGrossWeight.toFixed(3);
    localStorage.setItem(`totalProfit_${clientName}`, totalProfit.toFixed(2));
    localStorage.setItem(`totalGrossWeight_${clientName}`, totalGrossWeight.toFixed(3));
}
// Function to delete an order
function deleteOrder(clientName, index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    if (orders[clientName]) {
        orders[clientName].splice(index, 1); // Remove the order at the specified index
        localStorage.setItem('orders', JSON.stringify(orders));
        loadCustomerData(); // Reload the table
    }
}

// Function to save order data to local storage and update total profit
function saveOrderData(clientName, orderData) {
    const orders = JSON.parse(localStorage.getItem('orders')) || {};
    if (!orders[clientName]) {
        orders[clientName] = [];
    }
    orders[clientName].push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Update total profit
    let totalProfit = parseFloat(localStorage.getItem(`totalProfit_${clientName}`)) || 0;
    totalProfit += parseFloat(orderData.profit) || 0;
    localStorage.setItem(`totalProfit_${clientName}`, totalProfit.toFixed(3));
    // Update total gross weight
    let totalGrossWeight = parseFloat(localStorage.getItem(`totalGrossWeight_${clientName}`)) || 0;
    totalGrossWeight += parseFloat(orderData.grossWeight) || 0;
    localStorage.setItem(`totalGrossWeight_${clientName}`, totalGrossWeight.toFixed(3));
}

// Load customer data when the page is loaded
window.onload = function() {
    loadCustomerData();
};