import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.Init";
import ShowBook from "../ShowBook/ShowBook";

const AllBooks = () => {
  const [user] = useAuthState(auth);
  const [books, setBooks] = useState([]);
  const email = user.email;
  useEffect(() => {
    fetch(`https://warehouse-management-2z04.onrender.com/book?email=${email}`)
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [user, books]);
  return (
    <section className="row mx-auto container my-5">
      <h1 className="text-center text-primary">My Books Collection</h1>
      {books.map((book) => (
        <ShowBook key={book._id} book={book} />
      ))}
    </section>
  );
};

export default AllBooks;
