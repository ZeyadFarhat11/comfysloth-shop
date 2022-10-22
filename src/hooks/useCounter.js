import { useState } from "react";

function useCounter(init = 1) {
  const [count, setCount] = useState(init);

  const dispatch = (val, max) => {
    setCount((currentCount) => {
      if (currentCount < max && val === 1) {
        return currentCount + 1;
      } else if (currentCount > 1 && val === -1) {
        return currentCount - 1;
      }
      return currentCount;
    });
  };

  return [count, dispatch];
}

export default useCounter;
