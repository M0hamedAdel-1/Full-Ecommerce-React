import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

const ThemeProvider = ({children}) => {


    const [theme,setTheme] = useState(()=>{
        try{
            const saved = localStorage.getItem("theme")
            if(saved) return saved
            const isdark = window.matchMedia && window.matchMedia("(prefers-color-scheme:dark)").matches
             return isdark?"dark":"light"
        }catch{
            return "light";
        }
    })

    useEffect(() => {
    localStorage.setItem("theme", theme);
  
}, [theme]);


    useEffect(()=>{
    const root = document.documentElement;
     if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else if (theme === "system") {
    // يعتمد على system preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", isDark);
  }





    
},[theme])


     useEffect(()=>{
        const mq = window.matchMedia?.("(prefers-color-scheme:dark)")
        const handler = (e)=>{
            // only change if user hasnot explicitly chosen
            if(!localStorage.getItem("theme"))
                setTheme(e.matches?"dark":"light")

        }
        mq?.addEventListener?.("change",handler)
        return ()=> mq?.removeEventListener?.("change",handler);
    },[])

    const toggle = ()=> setTheme((prev)=> (prev ==="dark"?"light":"dark"))
  return (
    <ThemeContext.Provider value={{theme,setTheme,toggle}}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
