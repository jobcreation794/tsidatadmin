let requests = JSON.parse(localStorage.getItem("requests")) || [];

// Smooth scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Save to localStorage
function saveRequests() {
    localStorage.setItem("requests", JSON.stringify(requests));
}

// Display requests in dashboard
function loadRequests() {
    let tbody = document.querySelector("#requestTable tbody");
    tbody.innerHTML = "";

    requests.forEach((req, index) => {
        tbody.innerHTML += `
        <tr>
            <td>${req.name}</td>
            <td>${req.location}</td>
            <td>${req.phone}</td>
            <td>${req.description}</td>
            <td>${req.status}</td>
            <td>
                <button class="action-btn approve" onclick="approveRequest(${index})">Approve</button>
                <button class="action-btn collect" onclick="markCollected(${index})">Collected</button>
                <button class="action-btn delete" onclick="deleteRequest(${index})">Delete</button>
            </td>
        </tr>`;
    });
}

// Add new request
document.getElementById("requestForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let req = {
        name: document.getElementById("name").value,
        location: document.getElementById("location").value,
        phone: document.getElementById("phone").value,
        description: document.getElementById("description").value,
        status: "Pending"
    };

    requests.push(req);
    saveRequests();

    document.getElementById("successMessage").innerText = "Request submitted!";
});

// Admin login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (
        adminEmail.value === "admin@subcity.gov" &&
        adminPass.value === "admin123"
    ) {
        dashboard.classList.remove("hidden");
        login.classList.add("hidden");
        loadRequests();
    } else {
        loginError.innerText = "Invalid login";
    }
});

// Approve request
function approveRequest(i) {
    requests[i].status = "Approved";
    saveRequests();
    loadRequests();
}

// Mark collected
function markCollected(i) {
    requests[i].status = "Collected";
    saveRequests();
    loadRequests();
}

// Delete request
function deleteRequest(i) {
    requests.splice(i, 1);
    saveRequests();
    loadRequests();
}

// Logout
function logout() {
    dashboard.classList.add("hidden");
    login.classList.remove("hidden");
}
