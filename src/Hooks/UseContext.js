import React, { useState } from "react";

export const ThemeContext = React.createContext();

const toggleTheme = () => {
  setDarkTheme((prevTheme) => !prevTheme);
};

export default function UseContextHook() {
  const [darkTheme, setDarkTheme] = useState(true);
  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </ThemeContext.Provider>
    </>
  );
}
