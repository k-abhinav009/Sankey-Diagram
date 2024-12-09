import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../static/images.png";
const Header = (props) => {
  const { t, i18n } = useTranslation();

  const switchLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <header style={headerStyle}>
      {/* Centime Logo */}
      <div style={logoContainerStyle}>
        <img
          src={Logo}
          alt="Centime"
          style={{ width: "75px", height: "75px" }}
        />
      </div>

      {/* Title */}
      <h1 style={titleStyle}>{t(props.title)}</h1>

      {/* Language Dropdown */}
      <div style={dropdownContainerStyle}>
        <select
          onChange={(e) => switchLanguage(e.target.value)}
          defaultValue="en"
          style={dropdownStyle}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          {/* Add more languages here */}
        </select>
      </div>
    </header>
  );
};

export default Header;

// Inline styles
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#f5f5f5", // Optional background color
};

const logoContainerStyle = {
  flex: "0 0 auto",
};

const titleStyle = {
  flex: "1 1 auto",
  textAlign: "center",
  margin: "0",
};

const dropdownContainerStyle = {
  flex: "0 0 auto",
};

const dropdownStyle = {
  padding: "5px",
  fontSize: "16px",
};
