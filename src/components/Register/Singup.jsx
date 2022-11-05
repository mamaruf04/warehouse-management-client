import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.Init';
// import PageTitle from '../PageTitle/PageTitle';
import Loading from '../Shared/Loading/Loading';
import SocialAccount from '../SocialLogin/SocialLogin';
import './Singup.css';

const Signup = () => {
    const [yourName, setYourName] = useState([{ value: "", error: "" }])
    const [email, setEmail] = useState([{ value: "", error: "" }])
    const [password, setPassword] = useState([{ value: "", error: "" }])

    //navigate
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        createError,] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    //handle Profile 
    const handleName = event => {
        const nameValue = event.target.value
        setYourName({ value: nameValue, error: "" });
    }
    //handle email
    const handleEmail = event => {
        const emailValue = event.target.value
        console.log(emailValue);
        if (/\S+@\S+\.\S+/.test(emailValue)) {
            setEmail({ value: emailValue, error: "" });
        } else {
            setEmail({ value: "", error: "Please Provide a valid Email" });
        }
    }

    //handle password
    const handlePassword = event => {
        const passwordValue = event.target.value
        console.log(passwordValue);
        if (passwordValue.length < 6) {
            setPassword({ value: "", error: "Password must be 6 character or more" });
        }
        else {
            setPassword({ value: passwordValue, error: "" });
        }
    }

    //loading
    if (loading) {
        return <Loading />
    }

    //error
    if (createError) {
        toast.error(`Something is wrong`, { id: "error" });
    }

    // handle Submit
    const handleSubmit = event => {
        event.preventDefault()
        if (yourName.value === "") {
            setYourName({ value: "", error: "Name is required" });
        }
        if (email.value === "") {
            setEmail({ value: "", error: "Email is required" });
        }
        if (password.value === "") {
            setPassword({ value: "", error: "Password is required" });
        }

        if (email.value && password.value) {
            createUserWithEmailAndPassword(email.value, password.value)
            
                .then(() => {
                    toast.success("Welcome to Digital Camera Warehouse", { id: "success" });
                    navigate(from);
                    toast.success("Please verify your email", { id: "emailVerify" });
                })
        }
    }


    return (
        <div className='login-container w-50 my-0 mx-auto'>
            <div className="account-container container py-5 ">
                <div className=" text-light custom-style ">
                    <h3 className='text-center py-3 fst-italic text-primary'>Register now</h3>
                    <SocialAccount/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 " controlId="formBasicUsername">
                            <Form.Control type="name" onBlur={handleName} className='py-2 fs-5 fst-italic' name='name' placeholder="Enter  name" />
                        </Form.Group>
                        {yourName?.error && <p className="text-danger"> {yourName.error}</p>}
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Control type="email" onBlur={handleEmail} className='py-2 fs-5 fst-italic' name='email' placeholder="Enter  email" />
                        </Form.Group>
                        {email?.error && <p className="text-danger"> {email.error}</p>}
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" onBlur={handlePassword} className='py-2 fs-5 fst-italic' name='password' placeholder="Password" />
                        </Form.Group>
                        {password?.error && <p className="text-danger"> {password.error}</p>}
                        <Button variant="primary" type="submit" className='w-100 fs-5'>
                            Register
                        </Button>
                        <p className='toggle-page pt-2 text-dark text-center'>
                        Already have an account  ?{" "}
                        <span className='text-primary' onClick={() => navigate("/login")}>Please Login</span>
                    </p>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Signup;