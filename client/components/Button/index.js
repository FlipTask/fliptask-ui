import React from "react";

const Button = ({
    text,
    className,
    onClick,
    children,
    ...rest
}) => (
    <button onClick={onClick} className={`btn rounded ${className}`} type="button" {...rest}>
        {
            children || <span>{text}</span>
        }
    </button>
);

export default Button;
