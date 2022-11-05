
import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../firebase.Init";
import useHistory from "../../Hooks/useHistory";
import Loading from "../Shared/Loading/Loading";

import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";

const Login = () => {
  const [histories, setHistories] = useHistory();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [signInWithEmailAndPassword, user, loadding, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, error2] =
    useSendPasswordResetEmail(auth);

  let element;
  if (error) {
    element = <p className="text-danger">{error?.message}</p>;
  } else {
    element = "";
  }
  if (error2) {
    element = <p className="text-danger">{error2?.message}</p>;
  } else {
    element = "";
  }

  if (loadding || sending) {
    return <Loading />;
  }

  if (user) {
    navigate(from, { replace: true });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);

    // Create History Data
    const newHistory = {};
    newHistory.email = user?.email;
    newHistory.bookName = user?.displayName;
    newHistory.task = "Login";
    newHistory.time = Date().toLocaleString();

    // Post New History Data to server
    fetch("https://warehouse-management-2z04.onrender.com/histories", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newHistory),
    })
      .then((res) => res.json())
      .then((result) => {
        const updatedHistory = [...histories, newHistory];
        setHistories(updatedHistory);
      });
  };

  async function handlePasswordReset() {
    const email = emailRef?.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      // -------sweet alert 1------
      const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: 'We sent a secret link to your email.'
          })
// ---------------------------

      navigate(from, { replace: true });
    } else {
      // sweet alert 2------------------------
      Swal.fire({
        title: 'Enter your Email',
        text: 'Where we can send a recovery link.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
    }
  }

  return (
    <div className="row mx-0 login-component">
      <div className="col-12 col-md-6 mx-auto my-5 shadow-lg p-5">
        <h1 className="text-primary text-center fst-italic mb-2">Please login</h1>
        <Form  onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control className="fst-italic"
              ref={emailRef}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted fst-italic">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control  className="fst-italic"
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button
            className="border rounded fs-4 w-100  my-2 mx-auto d-block"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
        </Form>
        {element}
        <p className="pt-2">
          New to Book house?{" "}
          <Link to="/register" className="text-danger text-decoration-none">
            Please Register.
          </Link>
        </p>
        <p>
          Forget your password?{" "}
          <button
            onClick={handlePasswordReset}
            className="text-primary btn btn-link"
          >
            Reset Password
          </button>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;

// // -------------------------------------------------------------------


// // import axios from 'axios';
// import React, { useRef, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
// import toast from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Loading from '../Shared/Loading/Loading';
// // import PageTitle from '../../../components/PageTitle/PageTitle';
// import auth from '../../firebase.Init';
// import SocialAccount from '../SocialLogin/SocialLogin';
// import './Login.css';


// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState({ value: "", error: "" })
//     const [password, setPassword] = useState({ value: "", error: "" })
//     const emailRef = useRef('');

//     //navigate
//     let location = useLocation();
//     let from = location.state?.from?.pathname || "/";


//     const [signInWithEmailAndPassword, user, loading, loginError] = useSignInWithEmailAndPassword(auth);
//     const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);


//     //handle email
//     const handleEmail = event => {
//         const emailValue = event.target.value
//         if (/\S+@\S+\.\S+/.test(emailValue)) {
//             setEmail({ value: emailValue, error: "" });
//         } else {
//             setEmail({ value: "", error: "Please Provide a valid Email" });
//         }
//     }

//     //handle password
//     const handlePassword = event => {
//         const passwordValue = event.target.value
//         if (passwordValue.length < 6) {
//             setPassword({ value: "", error: "Password not match" });
//         }
//         else {
//             setPassword({ value: passwordValue, error: "" });
//         }
//     }

//     // navigate 
//     if (user) {

//     }

//     //loading
//     if (sending) {
//         return <Loading />
//     }

//     //error 
//     if (loginError) {
//         toast.error(`Sorry ! No User  found`, { id: "userError" });
//     }

//     //handle submit btn 
//     const handleSubmit = async event => {
//         event.preventDefault()

//         if (email.value === "") {
//             setEmail({ value: "", error: "Email is required" });
//         }

//         if (password.value === "") {
//             setPassword({ value: "", error: "Password is required" });
//         }

//         if (email.value && password.value) {
//             await signInWithEmailAndPassword(email.value, password.value);
//             // const { data } = await axios.post('https://camera-warehouse.herokuapp.com/login', { email });
//             // console.log(data);
//             // localStorage.setItem('accessToken', data.accessToken);
//             navigate(from, { replace: true });
//             toast.success(`Welcome Back To Warehouse `, { id: "welcome" });
//         }
//     }

//     // reset password 
//     const forgetPassword = async () => {
//         const email = emailRef.current.value;
//         console.log(email);
//         if (email) {
//             await sendPasswordResetEmail(email);
//             toast.success(`Reset password send `, { id: "reset" });
//         }
//         if (resetError) {
//             toast.error(`Email is incorrect `, { id: "errorSend" });
//         }
//     }


//     return (
//         <div className='login-container'>
//             {/* <PageTitle title="Login -"></PageTitle> */}
//             <div className=" account-container container py-5 ">
//                 <div className=" custom-style ">
//                     <h3 className='text-center mb-3 py-4 fst-italic'>Welcome Back</h3>
//                     <SocialAccount />
//                     {loginError && <p className="text-danger fs-4"> Could not find user </p>}

//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Control type="email" ref={emailRef} onBlur={handleEmail} className='py-2 fs-5 fst-italic' placeholder="Enter email" />
//                         </Form.Group>
//                         {email?.error && <p className="text-danger"> {email.error}</p>}

//                         <Form.Group className="mb-3" controlId="formBasicPassword">
//                             <Form.Control onChange={handlePassword} className='py-2 fs-5 fst-italic' type="password" placeholder="Password" />
//                         </Form.Group>
//                         {/* error handle  */}
//                         {password?.error && <p className="text-danger"> {password.error}</p>}

//                         {loginError && <p className="text-danger"> Password is Wrong</p>}
//                         <Button variant="primary" type="submit" className='w-100 fs-5'>
//                             Login
//                         </Button>
//                     </Form>
//                     <div className='d-flex mt-2'>
//                         <p><button className='btn btn-link text-primary fw-bold ps-0 pe-5 text-decoration-none' onClick={forgetPassword} >Forget Password?</button> </p>
//                         <div>{loading && <Loading />}</div>
//                     </div>
//                     <p className='toggle-page py-2 '>
//                         New to Book warehouse?{" "}
//                         <span onClick={() => navigate("/register")}>Create New Account</span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;