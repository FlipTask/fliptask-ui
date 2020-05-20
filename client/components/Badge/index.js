import React from "react";

const Badge = ({ text, className }) => (
    <span className={`badge ${className || ""}`}>
        {text}
    </span>
);

export default Badge;
