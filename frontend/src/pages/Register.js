import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/login.css";

function Register() {

    const navigate = useNavigate();

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });

    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    };

    const handleSubmit=async(e)=>{

        e.preventDefault();

        try{

            await API.post("/auth/register",formData);

            alert("Registration Successful");

            navigate("/login");

        }catch(error){

            alert(error.response?.data?.message);

        }

    };

    return(

        <div className="login-container">

            <div className="login-card">

                <h1>Create Account</h1>

                <form onSubmit={handleSubmit}>

                    <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    required
                    />

                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                    />

                    <button>

                        Register

                    </button>

                </form>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;