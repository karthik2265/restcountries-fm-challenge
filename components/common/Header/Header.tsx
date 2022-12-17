import React from "react";
// next
import Image from "next/image";
// types
import { RootState } from "../../../store";
// redux
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { useSelector } from "react-redux";
// styles and icons
import SunIcon from "../../../public/images/day-sunny-icon.svg";
import MoonIcon from "../../../public/images/moon-icon.svg";
import styles from "./Header.module.css";

// -> local components

const DarkOrLightModeButton = () => {
  const dispatch = useDispatch();
  // get theme
  const isLightTheme = useSelector((state: RootState) => state.ui.isLightTheme);

  // event handlers
  function changeThemeHandler() {
    dispatch(uiActions.setLightTheme(!isLightTheme));
  }
  return (
    <div className={styles["theme-space"]} onClick={changeThemeHandler}>
      {isLightTheme ? (
        <Image className={styles["theme-icon"]} src={SunIcon} alt="sun icon" />
      ) : (
        <Image className={styles["theme-icon"]} src={MoonIcon} alt="moon icon" />
      )}
      <h4> {(isLightTheme ? "Light" : "Dark") + " " + "Mode"} </h4>
    </div>
  );
};
const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Where in the world?</h1>
      <DarkOrLightModeButton />
    </header>
  );
};

export { Header };
