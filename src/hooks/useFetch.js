const { useState, useEffect, useCallback } = require("react")

const useFetch = (url, {includeCookies = false} = {}) => {

    const BASE_URL = "http://localhost:3001/api"

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: includeCookies ? 'include' : 'same-origin' // include cookies in the request
        };
        const response = await fetch(BASE_URL + url, requestOptions);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);  
      } finally {
        setIsLoading(false);
      }
    }, [url, includeCookies]);
    
    
    useEffect(() => {
        fetchData();
    }, [url, fetchData]);

    const refetch = () => {
      fetchData();
    };

      return { data, setData, isLoading, error, refetch};

}

module.exports = useFetch