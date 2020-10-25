import React from "react";
import { Link } from "react-router-dom";

const colorClassList = ["success", "info", "warning", "neutral", "primary", "danger"];

function random(min, max) {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
}

const InfoCard = ({
    title,
    to,
    icon
}) => {
    const randomClass = colorClassList[random(0, colorClassList.length - 1)];
    return (
        <div className="col-12 col-xs-12 col-md-4">
            <Link to={to} className={`info-card card`} suppressHydrationWarning={true}>
                <div className="card-char">
                    <span className={`card-char--circle border-${randomClass} text-${randomClass}`} suppressHydrationWarning={true}>
                        { title.charAt(0) }
                    </span>
                </div>
                <div className="card--header">
                    <h4>{title}</h4>
                </div>
                <div className="card--body">

                </div>
            </Link>
        </div>
    );
};

export default InfoCard;
