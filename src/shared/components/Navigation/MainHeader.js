import React from "react";
import "./MainHeader.css";

const MainHeader = (props) => {
  return <header className="main-header">
   {/* dynamic expression, few special props react knows */}
    {props.children}
  </header>;
};

export default MainHeader;
