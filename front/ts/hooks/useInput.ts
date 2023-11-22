import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // target에 value라는 값이 있을 때만
    if (e.target.value) {
      setValue(e.target.value as unknown as T);
    }
  }, []);

  return [value, handler, setValue];
};

export default useInput;
