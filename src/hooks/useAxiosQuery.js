import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../components/constants";

const useAxiosQuery = (uri) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      let storage = JSON.parse(localStorage.getItem(uri));
      if (!storage) {
        try {
          setIsLoading(true);
          const response = await axios.get(`${BASE_URL + uri}`);
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
