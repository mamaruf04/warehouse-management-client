import React, { useEffect, useState } from "react";
import Update from "../Update/Update";
import "./UpdateQuntity.css";

const UpdateQuntity = () => {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(
      `https://warehouse-management-2z04.onrender.com/bookbytext?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [searchText]);

  return (
    <div className="update-quntity p-2">
      <h1 className="my-4">Update Quntity</h1>
      <input
        className="w-100 rounded-pill p-2"
        onBlur={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search Book for Update."
      />
      {books.map((book) => (
        <Update key={book._id} book={book} />
      ))}
    </div>
  );
};

export default UpdateQuntity;
