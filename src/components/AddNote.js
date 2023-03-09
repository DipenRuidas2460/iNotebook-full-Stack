import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext";

function AddNote(props) {
    const context = useContext(noteContext)
    const { addNotes } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleSubmit = (e) => {
        e.preventDefault();
        addNotes(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully!", "success")
    }

    const handleOnchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={note.title}
                            id="title"
                            name='title'
                            aria-describedby="emailHelp"
                            onChange={handleOnchange}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={note.description}
                            id="description"
                            name='description'
                            onChange={handleOnchange}
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={note.tag}
                            id="tag"
                            name='tag'
                            aria-describedby="emailHelp"
                            onChange={handleOnchange}
                            minLength={5}
                            required
                        />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
