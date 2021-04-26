import React from "react";

const Header = ({ className, topicTitle }) => (
  <div>
    <h1 className={className}>{topicTitle}</h1>
  </div>
);

export default Header;
