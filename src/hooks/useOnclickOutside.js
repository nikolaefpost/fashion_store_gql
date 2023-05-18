import {useEffect} from "react";


export const useOnClickOutside = (ref, fn) => {
    const clickOutSide = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            fn();
        }
    }

  useEffect(()=>{
      window.addEventListener("mouseup", clickOutSide);

      return () => window.removeEventListener("mouseup", clickOutSide)
  },[])
}