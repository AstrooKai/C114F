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
}

// Sets the status message and applies error styling if needed
function setStatus(message, isError = false) {
    statusMsg.textContent = message; // Sets the status message
    statusMsg.classList.toggle("error", isError); // Applies error styling if needed
}

// Adds a new student to the list
function addStudent(name) {
    // Cleans the name by removing whitespace, converting to lowercase, splitting into words, filtering out empty strings, capitalizing each word, and joining them back together
    const cleaned = name
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(w => w.length > 0)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    // Checks if the name is empty. If so, sets the status message and returns
    if (cleaned === "") {
        setStatus("Please enter a name.", true);
        return;
    }

    // Adds the student to the list and re-renders the list
    students.push(cleaned);
    renderList();
    setStatus(`Added "${cleaned}".`);
}



// Removes the last student from the list
function removeLastStudent() {
    // Checks if the list is empty. If so, sets the status message and returns
    if (students.length === 0) {
        setStatus("The class list is empty.", true);
        return;
    }

    const removed = students.pop(); // Removes the last student from the list
    renderList(); // Re-renders the list
    setStatus(`Removed "${removed}".`); // Sets the status message
}

// Attaches an event listener to the add-form
document.getElementById("add-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevents the page from reloading when the form is submitted
    const input = document.getElementById("student-name"); // Gets the student name input
    addStudent(input.value); // Adds the student to the list
    input.value = ""; // Clears the input
    input.focus(); // Focuses the input
});

// Attaches an event listener to the remove-last-button
document.getElementById("remove-last-button").addEventListener("click", removeLastStudent);

renderList(); // Renders the initial list of students on load