const express = require('express');
const { createNotes, getNotes, updateNotes, deleteNotes } = require('../controllers/notesController');
const { createUser, loginUser, getUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/auth')
const router = express.Router()


// ______________________________User-Rotes___________________________________________________________//

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/getUser", authenticate, getUser)

// _____________________________Notes-Routes__________________________________________________________//

router.post("/createNotes", authenticate, createNotes)
router.get("/getNotes", authenticate, getNotes)
router.put("/updateNotes/:noteId", authenticate, updateNotes)
router.delete("/deleteNotes/:noteId", authenticate, deleteNotes)

module.exports = router