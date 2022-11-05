import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.Init";
import CustomLink from "../CustomLink/CustomLink";
import './MenuItems.css';

const MenuItems = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <CustomLink className={'nav-item'} to="/home">Home</CustomLink>
      <CustomLink className={'nav-item'} to="/allbook">My Items</CustomLink>
      <CustomLink className={'nav-item'} to="/blog">Blog</CustomLink>
      <CustomLink className={'nav-item'} to="/about">About Us</CustomLink>
      <CustomLink className={'nav-item'} to="/dashboard">Dashboard</CustomLink>
      {user ? (
        <button onClick={() => signOut(auth)} className="log-btn">
          Logout
        </button>
      ) : (
        <CustomLink className="log-btn" to="/login">Login</CustomLink>
      )}
    </>
  );
};

export default MenuItems;
