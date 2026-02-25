document.addEventListener("DOMContentLoaded", () => {
  const noteList = document.getElementById("note-list");
  const noteForm = document.getElementById("note-form");
  const noteInput = document.getElementById("note-input");

  // Function to fetch data from the backend
  const fetchNote = async () => {
    try {
      const response = await fetch("/note");
      const note = await response.json();
      noteList.innerHTML = ""; 
      note.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.text;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.addEventListener("click", async () => {
        await fetch(`/note/${item.id}`, { method: "DELETE" });
        fetchNote();
      });
      
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.style.marginLeft = "10px";
      editBtn.addEventListener("click", async () => {
        const updatedText = prompt("Edit your note:", item.text);
        if (updatedText !== null && updatedText.trim() !== "") {
    try {
      await fetch(`/note/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: updatedText }), 
      });
      
      fetchNote();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
});
     
  li.appendChild(delBtn);
  li.appendChild(editBtn);
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
