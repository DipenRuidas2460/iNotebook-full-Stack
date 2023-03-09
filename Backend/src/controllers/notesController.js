const noteModel = require('../models/NotesModel')
const mongoose = require('mongoose')
const { isValid, isValidBody, isValidStr } = require('../validators/validator')

const createNotes = async (req, res) => {
    try {
        let data = req.body

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty" }) }

        let { title, description, tag } = data

        let updateData = {}

        //___________________________________ title Validation_______________________________________________//

        if (!(title)) { return res.status(400).send({ status: false, message: "title is required." }); }
        if (!isValid(title)) return res.status(400).send({ status: false, message: "Please enter valid title" });
        if (!isValidStr(title)) return res.status(400).send({ status: false, message: "use alphabets only in title" });

        //_____________________________________ description Validation____________________________________________//

        if (!(description)) { return res.status(400).send({ status: false, message: "description is required." }); }
        if (!isValid(description)) return res.status(400).send({ status: false, message: "Please enter valid description" });
        if (!isValidStr(description)) return res.status(400).send({ status: false, message: "use alphabets only in description" });

        //_______________________________________ tag Validation___________________________________________//

        if (!tag) { return res.status(400).send({ status: false, message: "Please enter tag" }) };
        if (!isValid(tag)) return res.status(400).send({ status: false, message: "Please enter valid tag" })
        if (!isValidStr(tag)) return res.status(400).send({ status: false, message: "use alphabets only in tag" });


        updateData = {
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        }

        let notesData = await noteModel.create(updateData)
        return res.json(notesData)

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await noteModel.find({ user: req.user.id, isDeleted: false })  // ===== searching notes ======//

        // if (!notes.length) return res.status(404).send({ status: false, message: "Notes doesn't exists!" })  // === user not found === //

        return res.json(notes)
    } catch (err) {
        tes
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


const updateNotes = async (req, res) => {
    try {
        let data = req.body

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty" }) }

        let { title, description, tag } = data

        let noteId = req.params.noteId

        let updateData = {}

        //___________________________________ title Validation_______________________________________________//

        if (title) {
            if (!isValid(title)) return res.status(400).send({ status: false, message: "Please enter valid title" });
            if (!isValidStr(title)) return res.status(400).send({ status: false, message: "use alphabets only in title" });
            updateData.title = title
        }
        //_____________________________________ description Validation____________________________________________//

        if (description) {
            if (!isValid(description)) return res.status(400).send({ status: false, message: "Please enter valid description" });
            if (!isValidStr(description)) return res.status(400).send({ status: false, message: "use alphabets only in description" });
            updateData.description = description
        }
        //_______________________________________ tag Validation___________________________________________//

        if (tag) {
            if (!isValid(tag)) return res.status(400).send({ status: false, message: "Please enter valid tag" })
            if (!isValidStr(tag)) return res.status(400).send({ status: false, message: "use alphabets only in tag" });
            updateData.tag = tag
        }

        //------------[noteId validation ]--------------//

        if (!noteId) return res.status(400).send({ status: false, message: "Please provide noteId in params" })

        if (!mongoose.isValidObjectId(noteId)) return res.status(400).send({ status: false, message: "Invalid noteId in params" })

        const notes = await noteModel.findOne({ _id: noteId, isDeleted: false })

        if (!notes) return res.status(404).send({ status: false, message: "Notes doesn't exists" })  // === notes not found === //

        if (notes.user.toString() !== req.user.id) return res.status(401).send({ status: false, message: "Not Allowed!" })

        let notesData = await noteModel.findOneAndUpdate({ _id: noteId }, updateData, { new: true })
        return res.json({ notesData })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}

const deleteNotes = async (req, res) => {
    try {
        //------------[noteId validation ]--------------//

        let noteId = req.params.noteId

        if (!noteId) return res.status(400).send({ status: false, message: "Please provide noteId in params" })

        if (!mongoose.isValidObjectId(noteId)) return res.status(400).send({ status: false, message: "Invalid noteId in params" })

        const notes = await noteModel.findById({ _id: noteId })

        if (!notes) return res.status(404).send({ status: false, message: "Notes doesn't exists" })  // === notes not found === //

        if (notes.isDeleted === true) return res.status(404).send({ status: false, message: "Notes already deleted" })

        if (notes.user.toString() !== req.user.id) return res.status(401).send({ status: false, message: "Not Allowed!" })

        const note = await noteModel.findOneAndUpdate({ _id: noteId }, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })

        return res.json({ "Sucess": "Notes Deleted successfully.", note: note })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}



module.exports = { createNotes, getNotes, updateNotes, deleteNotes }