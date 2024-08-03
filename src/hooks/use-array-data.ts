import { useCallback, useState } from "react";

const useArrayData = <T>(defaultValue: T[]) => {
  const [data, setData] = useState(defaultValue);

  const addData = useCallback((newData: T) => {
    setData((prev) => [...prev, newData]);
  }, []);

  const removeData = useCallback((key: keyof T, value: any) => {
    setData((prev) => {
      return [...prev].filter((p) => p?.[key] !== value);
    });
  }, []);

  const clearData = useCallback(() => setData([]), []);

  return { data, addData, removeData, clearData };
};

export default useArrayData;
