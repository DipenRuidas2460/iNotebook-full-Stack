import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

function Login(props) {
  const [creadentials, setCreadentials] = useState({ email: "", password: "" });
  let navigate = useNavigate()
  const host = `http://localhost:3001`;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/loginUser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:creadentials.email, password:creadentials.password}),
    });

    const json = await response.json();
    if(json.status){
        localStorage.setItem('token', json.data.token)
        props.showAlert("LoggedIn Successfully!", "success")
        navigate('/')
    }else{
        props.showAlert("Invalid Details", "danger")
    }
  };

  const handleOnchange = (e) => {
    setCreadentials({ ...creadentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-3">
      <h2 className="my-3">Login to Continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
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
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
