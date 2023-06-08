import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../components/constants/constants";

const useAxiosQuery = (uri) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL + uri}`);
        setData(response.data);
        localStorage.setItem(uri, JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { data, isLoading, setData };
};

export default useAxiosQuery;
