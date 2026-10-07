// Initial array with at least 5 students
const students = [
    "Maria Santos",
    "Juan Dela Cruz",
    "Angela Reyes",
    "Miguel Bautista",
    "Bianca Villanueva"
];

// Creates references to DOM elements
const studentList = document.getElementById("student-list"); // Gets the student list element
const arrLength = document.getElementById("array-length"); // Gets the array length element
const emptyMsg = document.getElementById("empty-message"); // Gets the empty message element
const statusMsg = document.getElementById("status-message"); // Gets the status message element

const findResult = document.getElementById("find-result");
const joinResult = document.getElementById("join-result");
const toStringResult = document.getElementById("to-string-result");

// Renders the list of students to the DOM
function renderList() {
    studentList.innerHTML = ""; // Clears the list of students

    // Creates list items for each student
    students.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        studentList.appendChild(li);
    });

    arrLength.textContent = students.length; // Displays the length of the array
    emptyMsg.hidden = students.length > 0; // Hides the empty message if the array is not empty

    // Clears old results so they don't show outdated data
    findResult.textContent = "";
    joinResult.textContent = "";
    toStringResult.textContent = "";
}

// Sets the status message and applies error styling if needed
function setStatus(message, isError = false) {
    statusMsg.textContent = message;
    statusMsg.classList.toggle("error", isError);
}

// Adds a new student to the list
function addStudent(name) {
    const cleaned = name
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(w => w.length > 0)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    if (cleaned === "") {
        setStatus("Please enter a name.", true);
        return;
    }

    // Reject names with symbols/numbers, or names with no letters at all
    if (!/^[\p{L}\s\-'.]+$/u.test(cleaned) || !/\p{L}/u.test(cleaned)) {
        setStatus("Symbols and numbers are not allowed.", true);
        return;
    }

    students.push(cleaned);
    renderList();
    setStatus(`Added "${cleaned}".`);
}

// Removes the last student from the list
function removeLastStudent() {
    if (students.length === 0) {
        setStatus("The class list is empty.", true);
        return;
    }

    const removed = students.pop();
    renderList();
    setStatus(`Removed "${removed}".`);
}

// Find item by index using at()
function findStudentByIndex(indexInput) {
    if (indexInput === "" || indexInput === null) {
        return "Please enter a valid index number.";
    }

    const index = Number(indexInput);

    if (isNaN(index) || !Number.isInteger(index)) {
        return "Invalid index. Please enter a whole number.";
    }

    if (students.length === 0) {
        return "The class list is currently empty.";
    }

    // Check if the index is within the bounds of the array
    if (index < -students.length || index >= students.length) {
        return `Index ${index} is out of range. (Valid range: ${-students.length} to ${students.length - 1})`;
    }

    const item = students.at(index);
    return `Student at index ${index}: "${item}"`;
}

// Join array items using join()
function joinStudents(separator = ", ") {
    if (students.length === 0) {
        return "The class list is empty.";
    }
    return students.join(separator);
}

// Convert array to string using toString()
function convertStudentsToString() {
    if (students.length === 0) {
        return "The class list is empty.";
    }
    return students.toString();
}

// Event Listeners

// Event Listener: Add Student
document.getElementById("add-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("student-name");
    addStudent(input.value);
    input.value = "";
    input.focus();
});

// Event Listener: Remove Last Student
document.getElementById("remove-last-button").addEventListener("click", removeLastStudent);

// Event Listener: Find by Index
document.getElementById("find-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const indexInput = document.getElementById("student-index").value;
    const result = findStudentByIndex(indexInput);
    findResult.textContent = result;
});

// Event Listener: Join Items
document.getElementById("join-button").addEventListener("click", () => {
    const customSep = document.getElementById("separator").value;
    const result = joinStudents(customSep || ", ");
    joinResult.textContent = result;
});

// Event Listener: Convert to String
document.getElementById("to-string-button").addEventListener("click", () => {
    const result = convertStudentsToString();
    toStringResult.textContent = result;
});

renderList(); // Initial render on page load