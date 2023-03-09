const userModel = require('../models/UserModel')
// const { body, validationResult } = require('express-validator')
const { isValid, isValidBody, isValidEmail, isValidMobile, isValidPassword, isValidStr } = require('../validators/validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')

const createUser = async (req, res) => {
    try {
        let data = req.body

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty" }) }

        let { fname, lname, email, password, mobile } = data

        let updateData = {}

        //___________________________________ fname Validation_______________________________________________//

        if (!(fname)) { return res.status(400).send({ status: false, message: "first name is required." }); }
        if (!isValid(fname)) return res.status(400).send({ status: false, message: "Please enter valid first name" });
        if (!isValidStr(fname)) return res.status(400).send({ status: false, message: "use alphabets only in first name" });
        if ((fname).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from first name" }); }

        //_____________________________________ lname Validation____________________________________________//

        if (!(lname)) { return res.status(400).send({ status: false, message: "last name is required." }); }
        if (!isValid(lname)) return res.status(400).send({ status: false, message: "Please enter valid last name" });
        if (!isValidStr(lname)) return res.status(400).send({ status: false, message: "use alphabets only in last name" });
        if ((lname).includes(" ")) { return res.status(400).send({ status: false, message: "Please remove any empty spaces from last name" }); }

        //_______________________________________ email Validation___________________________________________//

        if (!email) { return res.status(400).send({ status: false, message: "Please enter email" }) };
        if (!isValid(email)) return res.status(400).send({ status: false, message: "Please enter valid EmailId" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Email is invalid." })
        const OldEmail = await userModel.findOne({ email })
        if (OldEmail) return res.status(409).send({ status: false, message: "email already exists" })

        // _______________________________________password Validation_________________________________________//

        if (!password) { return res.status(400).send({ status: false, message: "Please enter password" }) };
        if (!isValid(password)) { return res.status(400).send({ status: false, message: "Provide a valid password" }); }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Enter a Strong Password & It should be in 8-15 character" }) }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        // _______________________________________mobile-number Validation_____________________________________________//

        if (!mobile) return res.status(400).send({ status: false, message: "Enter mobile number" })
        if (!isValid(mobile)) { return res.status(400).send({ status: false, message: "provide Valid mobile no." }); }
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, message: "Mobile number is invalid." })
        const uniqueMobile = await userModel.findOne({ mobile })
        if (uniqueMobile) return res.status(409).send({ status: false, message: "Mobile number already in use" })


        // const userData = userModel(req.body)
        // userData.save()

        updateData = {
            fname: fname,
            lname: lname,
            email: email,
            password: secPass,
            mobile: mobile
        }

        let user = await userModel.create(updateData)

        //----------------generating token --------------------------------//

        const tokenData = {
            user: { id: user.id },
            at: Math.floor(Date.now() / 1000),                //issued date
            exp: Math.floor(Date.now() / 1000) + 72 * 60 * 60  //expires in 72 hr 72 represent this
        }

        let token = jwt.sign(tokenData, "iNotebook3585");

        res.setHeader("auth-token", token);
        return res.status(200).send({ status: true, message: 'User Registered Sucessfully', data: { userId: user._id, token: token } });

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


const loginUser = async (req, res) => {
    try {
        let data = req.body

        if (!isValidBody(data)) { return res.status(400).send({ status: false, message: "Data can't be empty" }) }

        let { email, password } = data
        //_______________________________________ email Validation___________________________________________//

        if (!email) { return res.status(400).send({ status: false, message: "Please enter email" }) };
        if (!isValid(email)) return res.status(400).send({ status: false, message: "Please enter valid EmailId" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Email is invalid." })

        // _______________________________________password Validation_________________________________________//

        if (!password) { return res.status(400).send({ status: false, message: "Please enter password" }) };
        if (!isValid(password)) { return res.status(400).send({ status: false, message: "Provide a valid password" }); }
        if (!isValidPassword(password)) { return res.status(400).send({ status: false, message: "Enter a Strong Password & It should be in 8-15 character" }) }


        const user = await userModel.findOne({ email })
        if (!user) return res.status(404).send({ status: false, message: "please try to login correct login credentials." })

        const matchUser = await bcrypt.compare(password, user.password);

        if (!matchUser) return res.status(401).send({ status: false, message: "please try to login correct login credentials." })

        //----------------generating token --------------------------------//

        const tokenData = {
            user: { id: user.id },
            at: Math.floor(Date.now() / 1000),                //issued date
            exp: Math.floor(Date.now() / 1000) + 72 * 60 * 60  //expires in 72 hr 72 represent this
        }

        let token = jwt.sign(tokenData, "iNotebook3585");

        res.setHeader("auth-token", token);
        return res.status(200).send({ status: true, message: 'User login successfully', data: { userId: user._id, token: token } });
    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


const getUser = async (req, res) => {
    try {
        let userId = req.user.id

        //------------[user id validation ]--------------//

        // if (!userId) return res.status(400).send({ status: false, message: "Please provide userId in params" })

        // if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid userId in params" })

        const user = await userModel.findById({ _id: userId }).select("-password")  // ===== searching user ======//

        if (!user) return res.status(404).send({ status: false, message: "User doesn't exists by userId" })  // === user not found === //

        return res.status(200).send({ status: true, message: "Profile found successfully.", data: user })
    } catch (err) {
        return res.status(500).send({ status: false, message: "Error", error: err.message })
    }
}


module.exports = { createUser, loginUser, getUser }