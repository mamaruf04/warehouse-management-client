import { useEffect, useState } from "react";

const useBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://warehouse-management-2z04.onrender.com/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, [books]);

  return [books, setBooks];
};

export default useBook;
