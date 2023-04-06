import {useEffect, useState} from "react";


export const useWindowSize = () => {

  const getWindowSize = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  const [windowSize, setWindowSize] = useState(getWindowSize())

  const resize = () => {
    setWindowSize(getWindowSize())
  }

  useEffect(() => {

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return windowSize;
}