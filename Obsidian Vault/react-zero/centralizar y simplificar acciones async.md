 ```jsx
 import { useState, useCallback } from "react";

  

export function useAsyncAction() {

const [loading, setLoading] = useState(false);

  

const run = useCallback(async <T>(fn: () => Promise<T>) => {

setLoading(true);

try {

return await fn();

} finally {

setLoading(false);

}

}, []);

  

return {

loading,

run,

};

}
 ``` 