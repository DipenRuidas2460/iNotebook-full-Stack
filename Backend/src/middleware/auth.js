const userModel = require("../models/UserModel");
// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authenticate = function (req, res, next) {
    try {
        const token = req.header('auth-token')
        if (!token) { return res.status(400).send({ status: false, message: `Missing authentication token in request` }) }
        try {
            let verifyToken = jwt.verify(token, "iNotebook3585");
            req.user = verifyToken.user
            next()
        } catch (err) {
            res.status(401).send({ status: false, msg: "Token is expired"})
        }

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


// const authorize = async function (req, res, next) {
//     try {
//         const token = req.header('Authorization', 'Bearer Token')
//         if (!token) { return res.status(401).send({ status: false, message: `Missing authentication token in request` }) }

//         let splitToken = token.split(' ')

//         let decodedToken = jwt.verify(splitToken[1],"iNotebook3585")

//         let userLoggedIn = decodedToken.userId

//         let userToBeModified = req.params.userId

//         if (!userToBeModified) return res.status(400).send({ status: false, message: "User Id must be present in params" })

//         if (!mongoose.isValidObjectId(userToBeModified)) return res.status(400).send({ status: false, message: "Invalid userId" })

//         let newUserId = await userModel.findById({ _id: userToBeModified })

//         if (!newUserId) return res.status(404).send({ status: false, message: "No such User Present" })

//         let user = newUserId._id

//         if (user != userLoggedIn) return res.status(403).send({ status: false, message: "You are not authorized to do this" })

//         next();

//     } catch (err) {
//         res.status(500).send({ message: "Error", error: err.message });
//     }
// };



module.exports = { authenticate }