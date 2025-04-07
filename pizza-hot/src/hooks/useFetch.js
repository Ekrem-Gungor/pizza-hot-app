import { useCallback, useEffect, useState } from "react";

export default function useFetch(url, option, initialData) {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const SendRequest = useCallback(
    async function SendRequest(data) {
      setIsLoading(true);
      try {
        const response = await fetch(url, { ...option, body: data });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [url, option]
  );

  useEffect(() => {
    if (option && option.method === "GET") {
      SendRequest();
    }
  }, [SendRequest, option]);

  return { data, error, isloading, SendRequest };
}
