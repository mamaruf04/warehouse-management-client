import { useEffect, useState } from "react";

const useHistory = () => {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch("https://warehouse-management-2z04.onrender.com/histories")
      .then((res) => res.json())
      .then((data) => setHistories(data));
  }, [histories]);

  return [histories, setHistories];
};

export default useHistory;
