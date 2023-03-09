import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Signup(props) {
    const [creadentials, setCreadentials] = useState({ fname: "", lname: "", email: "", mobile: "", password: "", cpassword: "" });
    let navigate = useNavigate()
    const host = `http://localhost:3001`;
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${host}/createUser`;
        const { fname, lname, email, password, mobile } = creadentials
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fname, lname, email, mobile, password }),
        });

        const json = await response.json();
        if (json.status) {
            localStorage.setItem('token', json.data.token)
            props.showAlert("Account Created Sucessfully!", "success")
            navigate('/login')
        } else {
            props.showAlert("Invalid Creadentials", "danger")
        }
    };

    const handleOnchange = (e) => {
        setCreadentials({ ...creadentials, [e.target.name]: e.target.value });
    };
    return (
        <div className='container mt-2'>
            <h2 className="my-3">Create an account to use iNotebok</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={creadentials.fname}
                        onChange={handleOnchange}
                        id="fname"
                        name="fname"
                        minLength={3}
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={creadentials.lname}
                        onChange={handleOnchange}
                        id="lname"
                        name="lname"
                        minLength={3}
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                        Enter Mobile
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        value={creadentials.mobile}
                        onChange={handleOnchange}
                        id="mobile"
                        name="mobile"
                        minLength={10}
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        value={creadentials.email}
                        onChange={handleOnchange}
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={creadentials.password}
                        onChange={handleOnchange}
                        id="password"
                        name="password"
                        minLength={8}
                        maxLength={16}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        value={creadentials.cpassword}
                        onChange={handleOnchange}
                        id="cpassword"
                        name="cpassword"
                        minLength={8}
                        maxLength={16}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Signup
