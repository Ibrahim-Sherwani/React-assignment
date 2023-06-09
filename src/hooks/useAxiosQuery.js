import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosQuery = (uri) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      let storage = JSON.parse(localStorage.getItem(uri));
      if (!storage) {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/${uri}`
          );
          setData(response.data);
          localStorage.setItem(uri, JSON.stringify(response.data));
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      } else {
        setData(storage);
      }
    })();
  }, []);

  useEffect(() => {}, [data]);

  return { data, isLoading, setData };
};

export default useAxiosQuery;
