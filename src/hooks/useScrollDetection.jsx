import { useEffect, useState } from "react";


export const useScrollDetection = () => {
    const [
      isNearBottom,
      setIsNearBottom,
    ] = useState(false);
    const handleScroll = () => {
        const bottom = window.scrollY + window.innerHeight >= window.document.documentElement.scrollHeight ;
        if (bottom) setIsNearBottom(true);
        else setIsNearBottom(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll',handleScroll)
    })

    return isNearBottom;
}