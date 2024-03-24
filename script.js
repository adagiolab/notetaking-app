async function fetchNotes() {
    try {
      const response = await fetch('/api/notes');
      const notes = await response.json();
      const noteList = document.getElementById('noteList');
      noteList.innerHTML = '';
      notes.forEach(note => {
        const li = document.createElement('li');
        li.textContent = `${note.title}: ${note.content}`;
        noteList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }
  
  async function saveNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    if (!title || !content) {
      alert('Please enter a title and content for the note.');
      return;
    }
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  }
  
  window.onload = () => {
    fetchNotes();
  };
  