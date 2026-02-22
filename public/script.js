document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.getElementById("note-list");
  const noteForm = document.getElementById("note-form");
  const noteInput = document.getElementById("note-input");

  // Function to fetch data from the backend
  const fetchNote = async () => {
    try {
      const response = await fetch("/note");
      const note = await response.json();
      noteList.innerHTML = ""; // Clear the list before rendering
      note.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.id + ": " + JSON.stringify(item);
        noteList.appendChild(li);
      });
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  // Handle form submission to add new data
  noteForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newNote = { text: noteInput.value };

    try {
      const response = await fetch("/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        noteInput.value = ""; // Clear input field
        fetchNote(); // Refresh the list
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  });

  // Fetch data on page load
  fetchNote();
});
