import React, { useContext, useState } from "react";

const ThemeContext = React.createContext();

export default function UseContextHook() {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const FunctionContextComponent = () => {
    const darkTheme = useContext(ThemeContext);
    const themeStyles = {
      backgroundColor: darkTheme ? "#333" : "#ccc",
      color: darkTheme ? "#ccc" : "#333",
      padding: "2rem",
      margin: "2rem",
    };
    return <div style={themeStyles}>Function Theme</div>;
  };

  return (
    <>
      <ThemeContext.Provider value={darkTheme}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <FunctionContextComponent />
      </ThemeContext.Provider>
    </>
  );
}
