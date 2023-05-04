import { useState, useEffect } from "react";
import axios from "axios";
const API_KEYS = [  "e1f551e355msh3de0e993af705eep15c108jsn7b13fc58d6b7",  "8a5cfbc52fmsh6a7b0ca7ebb11e3p17d1bdjsna8ca31efe466",  "3bb9190bccmshe0a70f9687fcb69p1e5546jsnc6971456c571",];

export const useFetch = (endpoint, query) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": API_KEYS[apiKeyIndex],
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If the error is "Too Many Requests", switch to the next API key
        setApiKeyIndex((prevIndex) => prevIndex + 1);
        if (apiKeyIndex < API_KEYS.length - 1) {
          fetchData();
        } else {
          setError(error);
          setIsLoading(false);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch =()=>{
   setIsLoading(true)
   fetchData()
  }

  return {data,isLoading,error,refetch}
};
