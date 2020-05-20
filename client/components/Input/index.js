import React, { Component } from "react";


class Input extends Component {
    render() {
        const {
            value,
            type,
            label,
            placeholder,
            onChange,
            name,
            className,
            // eslint-disable-next-line no-unused-vars
            readOnly = false,
            icon = false,
            iconPosition = "left",
            ...rest
        } = this.props;
        if (type === "textarea") {
            return (
                <div className="form-group">
                    <div className="input-group">
                        {
                            label
                                ? <label className="label">{label}</label>
                                : ""
                        }
                        <textarea
                            {...rest}
                            value={value}
                            placeholder={placeholder}
                            onChange={onChange}
                            name={name}
                            className={`${className || ""} form-control`}
                        />
                    </div>
                </div>
            );
        }
        if (type === "dropdown") {
            return (
                <div className="form-group">
                    <div className="input-group">
                        {
                            label
                                ? <label className="label">{label}</label>
                                : ""
                        }
                        <input
                            {...rest}
                            value={value}
                            type={"text"}
                            placeholder={placeholder}
                            onChange={onChange}
                            name={name}
                            className={`${className || ""} form-control`}
                        />
                        <i className="fas fa-chevron-down text-light" aria-hidden="true"></i>
                    </div>
                </div>

            );
        }
        // eslint-disable-next-line no-nested-ternary
        const classNameIfIcon = icon ? (iconPosition === "left" ? "to-left" : "to-right") : "";
        return (
            <div className="form-group">
                <div className={`input-group ${icon ? "with-icon" : ""}`}>
                    {
                        label
                            ? <label className="label">{label}</label>
                            : ""
                    }
                    {
                        icon
                            ? <i className={`fas fa-${icon} icon ${classNameIfIcon}`}></i>
                            : ""
                    }
                    <input
                        {...rest}
                        value={value}
                        type={type || "text"}
                        placeholder={placeholder}
                        onChange={onChange}
                        name={name}
                        className={`${className || ""} form-control ${classNameIfIcon}`}
                    />
                </div>
            </div>

        );
    }
}

export default Input;
