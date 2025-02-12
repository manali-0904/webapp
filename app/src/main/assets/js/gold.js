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
};

// Selecting the elements
const submitBtn = document.getElementById("submitBtn");
const clientNameInput = document.getElementById("clientName");
const pendingGoldInput = document.getElementById("pendingGold");
const pendingList = document.getElementById("pendingList");
const totalSumDisplay = document.getElementById("totalSum");

let totalSum = 0; // Total pending gold

// Function to update total sum
function updateTotalSum() {
    totalSumDisplay.textContent = totalSum.toFixed(2) + " gm";
    localStorage.setItem("pendingGoldTotal", totalSum.toFixed(2)); // Update local storage
}

// Function to create a list item
function createListItem(name, weight) {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    // Checkbox to mark as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    let isChecked = false;

    // Update total sum when checkbox is checked/unchecked
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            // Subtract weight when checked
            totalSum -= Number(weight);
            isChecked = true;
        } else {
                totalSum += Number(weight); // Add weight back
                isChecked = false;
            }

        // Update total sum and mark as completed
        updateTotalSum();
        textContent.classList.toggle("completed", isChecked);
        saveDataToLocalStorage();
    });

    // Text content
    const textContent = document.createElement("span");
    textContent.textContent = `${name} : ${weight} gm`;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
        // Adjust total sum based on whether the item was completed or not
        if (!isChecked) {
            totalSum -= Number(weight);
        }
        pendingList.removeChild(listItem);
        totalSum = Math.max(totalSum, 0);
        updateTotalSum();
        saveDataToLocalStorage();
    });

    // Append elements to list item
    listItem.appendChild(checkbox);
    listItem.appendChild(textContent);
    listItem.appendChild(deleteBtn);

    return listItem;
}

// Function to save data to local storage
function saveDataToLocalStorage() {
    const pendingGoldData = [];
    document.querySelectorAll(".list-item").forEach(item => {
        const text = item.querySelector("span").textContent;
        const [name, weight] = text.split(" : ");
        const isChecked = item.querySelector("input[type='checkbox']").checked;
        pendingGoldData.push({ name, weight: parseFloat(weight), completed: isChecked });
    });
    localStorage.setItem("pendingGoldData", JSON.stringify(pendingGoldData));
    localStorage.setItem("pendingGoldTotal", totalSum);
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const pendingGoldData = JSON.parse(localStorage.getItem("pendingGoldData")) || [];
    totalSum = parseFloat(localStorage.getItem("pendingGoldTotal")) || 0;
    pendingGoldData.forEach(({ name, weight, completed }) => {
        const listItem = createListItem(name, weight);
        const checkbox = listItem.querySelector("input[type='checkbox']");
        checkbox.checked = completed;
        if (completed) {
            listItem.querySelector("span").classList.add("completed");
        }
        pendingList.appendChild(listItem);
    });
    updateTotalSum();
}

// Submit button event listener
submitBtn.addEventListener("click", () => {
    const name = clientNameInput.value.trim();
    const weight = pendingGoldInput.value.trim();

    // Validation
    if (name === "" || weight === "") {
        alert("Please fill out both fields.");
        return;
    }

    // Add new item to the list
    const listItem = createListItem(name, weight);
    pendingList.appendChild(listItem);

    // Update total sum
    totalSum += Number(weight);
    updateTotalSum();
    saveDataToLocalStorage();

    // Clear the form fields
    clientNameInput.value = "";
    pendingGoldInput.value = "";
});

// Load data from local storage when the page is loaded
window.onload = function() {
    loadDataFromLocalStorage();
};