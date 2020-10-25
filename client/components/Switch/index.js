import React from "react";

const Switch = ({ checked, onChange }) => (
    <label className="switch">
        <input onChange={onChange} type="checkbox" checked={checked ? "checked" : ""}/>
        <span className="slider round" />
    </label>
);

export default Switch;
