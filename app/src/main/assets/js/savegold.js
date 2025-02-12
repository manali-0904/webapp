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
window.onclick = function (event) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar.contains(event.target) && !event.target.matches('.openbtn')) {
        sidebar.classList.remove("open");
    }
};

// Selecting the elements
const submitBtn = document.getElementById("submitBtn");
const clientNameInput = document.getElementById("clientName");
const savedGoldInput = document.getElementById("savedGold");
const savedGoldList = document.getElementById("Savedgoldlist");
const totalSumDisplay = document.getElementById("totalSum");

let totalSavedGold = 0; // Total saved gold

// Function to update total saved gold display
function updateTotalSum() {
    totalSumDisplay.textContent = totalSavedGold.toFixed(2) + " gm";
    localStorage.setItem("savedGoldTotal", totalSavedGold.toFixed(2)); // Update local storage
}

// Function to create a list item
function createListItem(name, weight) {
    const listItem = document.createElement("div");
    listItem.classList.add("list-item");

    // Checkbox to mark as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    // Text content
    const textContent = document.createElement("span");
    textContent.textContent = `${name} : ${weight} gm`;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    // Checkbox event listener
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            totalSavedGold -= Number(weight); // Subtract weight when checked
        } else {
            totalSavedGold += Number(weight); // Add weight back when unchecked
        }
        textContent.classList.toggle("completed", checkbox.checked); // Mark as completed
        updateTotalSum();
        saveDataToLocalStorage();
    });

    // Delete button event listener
    deleteBtn.addEventListener("click", () => {
        if (!checkbox.checked) {
            totalSavedGold -= Number(weight);
        }
        savedGoldList.removeChild(listItem);
        totalSavedGold = Math.max(totalSavedGold, 0); // Ensure totalSavedGold does not go below zero
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
    const savedGoldData = [];
    document.querySelectorAll(".list-item").forEach(item => {
        const text = item.querySelector("span").textContent;
        const [name, weight] = text.split(" : ");
        const isChecked = item.querySelector("input[type='checkbox']").checked;
        savedGoldData.push({ name, weight: parseFloat(weight), completed: isChecked });
    });
    localStorage.setItem("savedGoldData", JSON.stringify(savedGoldData));
    localStorage.setItem("savedGoldTotal", totalSavedGold);
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const savedGoldData = JSON.parse(localStorage.getItem("savedGoldData")) || [];
    totalSavedGold = parseFloat(localStorage.getItem("savedGoldTotal")) || 0;
    savedGoldData.forEach(({ name, weight, completed }) => {
        const listItem = createListItem(name, weight);
        const checkbox = listItem.querySelector("input[type='checkbox']");
        checkbox.checked = completed;
        if (completed) {
            listItem.querySelector("span").classList.add("completed");
        }
        savedGoldList.appendChild(listItem);
    });
    updateTotalSum();
}

// Submit button event listener
submitBtn.addEventListener("click", () => {
    const name = clientNameInput.value.trim();
    const weight = savedGoldInput.value.trim();

    // Validation
    if (name === "" || weight === "") {
        alert("Please fill out both fields.");
        return;
    }

    // Add new item to the list
    const listItem = createListItem(name, weight);
    savedGoldList.appendChild(listItem);

    // Update total saved gold
    totalSavedGold += Number(weight);
    updateTotalSum();
    saveDataToLocalStorage();

    // Clear the form fields
    clientNameInput.value = "";
    savedGoldInput.value = "";
});

// Load data from local storage when the page is loaded
window.onload = function () {
    loadDataFromLocalStorage();
};
