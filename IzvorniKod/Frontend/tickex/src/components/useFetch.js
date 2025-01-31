import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url || url.includes("null") || url.includes("NaN")) {
            setIsPending(false);
            setError("Invalid URL");
            return;
        }
    
        const formattedUrl = url.includes('?')
            ? `${url}&timestamp=${new Date().getTime()}`.replace(/([^:]\/)\/+/g, "$1")
            : `${url}?timestamp=${new Date().getTime()}`.replace(/([^:]\/)\/+/g, "$1");
    
        const abortCont = new AbortController();
    
        fetch(formattedUrl, { signal: abortCont.signal, credentials: "include" })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    setIsPending(false);
                    setError(err.message);
                }
            });
    
        return () => abortCont.abort();
    }, [url]);
    
    return { data, isPending, error };
}

export default useFetch;
