import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../firebase.Init";
import useHistory from "../../../Hooks/useHistory";
import "./UpdateItem.css";

const UpdateItem = () => {
  const [book, setBook] = useState([]);
  const [histories, setHistories] = useHistory();
  const [user] = useAuthState(auth);
  const { itemid } = useParams();
  const { register, handleSubmit } = useForm();
  const {
    bookName,
    author,
    catagory,
    stockQuantity,
    publishar,
    subTitle,
    description,
    photo,
    price,
  } = book;

  useEffect(() => {
    fetch(`https://warehouse-management-2z04.onrender.com/book/${itemid}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [itemid]);

  const onSubmit = (newBook) => {
    const url = `https://warehouse-management-2z04.onrender.com/bookupdate/${itemid}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: 'Done!',
          text: 'Book updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        setBook(data);
      });

    // Create History Data
    const newHistory = {};
    newHistory.email = user.email;
    newHistory.bookName = newBook.bookName;
    newHistory.task = "Updated";
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
  return (
    <div className="update">
      <form className="mx-3 shadow p-3 my-5" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-primary">Update Product</h1>
        <div className="my-3">
          <label htmlFor="bookname" className="form-label">
            Book Name
          </label>
          <input
            className="form-control"
            {...register("bookName")}
            placeholder={bookName}
            id="bookname"
          />
        </div>
        <div className="my-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            className="form-control"
            {...register("author")}
            placeholder={author}
            id="author"
          />
        </div>
        <div className="my-3">
          <label htmlFor="publishar" className="form-label">
            Publishar
          </label>
          <input
            className="form-control"
            {...register("publishar")}
            placeholder={publishar}
            id="publishar"
          />
        </div>
        <div className="my-3">
          <label htmlFor="subTitle" className="form-label">
            Sub Title
          </label>
          <input
            className="form-control"
            {...register("subTitle")}
            placeholder={subTitle}
            id="subTitle"
          />
        </div>
        <div className="my-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            {...register("description")}
            placeholder={description}
            id="description"
          />
        </div>
        <div className="d-flex">
          <div className="my-3 w-75">
            <label htmlFor="catagory" className="form-label">
              Catagory
            </label>
            <input
              className="form-control"
              {...register("catagory")}
              placeholder={catagory}
              id="catagory"
            />
          </div>
          <div className="my-3 w-25">
            <label htmlFor="stockQuantity" className="form-label">
              Stock Quantity
            </label>
            <input
              type="number"
              className="form-control"
              {...register("stockQuantity")}
              placeholder={stockQuantity}
              id="stockQuantity"
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="my-3 w-75">
            <label htmlFor="photo" className="form-label">
              Plase Photo URL
            </label>
            <input
              className="form-control"
              {...register("photo")}
              placeholder={photo}
              id="photo"
            />
          </div>
          <div className="my-3 w-25">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              {...register("price")}
              placeholder={price}
              id="price"
            />
          </div>
        </div>
        <input type="submit" value="Update Items" />
      </form>
    </div>
  );
};

export default UpdateItem;
