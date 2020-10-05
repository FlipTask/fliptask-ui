import React from "react";

const FontLogo = ({
    hideTail = false,
    fontSize = 2,
    color = "var(--theme-text-color)",
    display = "block"
}) => (
    <div className="font-logo" style={{
        fontSize: `${fontSize}em`,
        color,
        display
    }}>
        <span className="f">F</span>
        {
            !hideTail
                ? <React.Fragment>
                    <span>lip</span>
                    <span>T</span>
                    <span>ask</span>
                </React.Fragment>
                : ""
        }
    </div>
);

export default FontLogo;
