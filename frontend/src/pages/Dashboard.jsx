import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    await axios.post(
      "http://localhost:5000/api/notes",
      { content: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchNotes();
  };

  return (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
    <div className="w-full max-w-xl bg-slate-800 rounded-2xl shadow-xl p-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        📝 Notes Dashboard
      </h2>

      {/* Input Section */}
      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={addNote}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-slate-400 text-center">No notes yet...</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-slate-700 p-4 rounded-lg flex justify-between items-center hover:bg-slate-600 transition"
            >
              <p className="text-white break-words">{note.content}</p>

              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
};

export default Dashboard;