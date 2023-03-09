import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNotes } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h6 className="card-title">{note.title}</h6>
            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deleteNotes(note._id);
                props.showAlert("Deleted Successfully!", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description} </p>
          <p className="card-text">{note.tag} </p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
