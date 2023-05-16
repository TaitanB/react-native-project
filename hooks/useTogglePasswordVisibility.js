import { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [toggleText, setToggleText] = useState("Show");

  const handlePasswordVisibility = () => {
    if (toggleText === "Show") {
      setToggleText("Hide");
      setPasswordVisibility(!passwordVisibility);
    } else if (toggleText === "Hide") {
      setToggleText("Show");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    toggleText,
    handlePasswordVisibility,
  };
};
