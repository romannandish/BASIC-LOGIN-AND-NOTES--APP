import Note from "../models/Note.js";

// 🔹 Get all notes (only user's notes)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔹 Add note
export const createNote = async (req, res) => {
  try {
    const { content } = req.body;

    const note = await Note.create({
      content,
      user: req.user.id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 🔹 Delete note
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    // check owner
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await note.deleteOne();
    res.json({ msg: "Note deleted" });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};