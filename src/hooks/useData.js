import axios from "axios";
import { useEffect, useState } from "react";

export const useData = (query, page) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://dummyjson.com/users/search?q=${query}`,
    }).then((res) => {
      console.log(res.data);
      setData(res.data.users);
    });
  }, [query]);

  return { data, setData };
};
