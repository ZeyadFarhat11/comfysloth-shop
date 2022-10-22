import { useState } from "react";

function useCounter(init = 1) {
  const [count, setCount] = useState(init);

  const dispatch = (val) => {
    setCount((currentCount) => {
      if (currentCount < 20 && val === 1) {
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
