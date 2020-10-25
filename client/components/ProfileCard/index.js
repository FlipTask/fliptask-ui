import React from "react";

const userCard = ({ data }) => (
    <div className="col-12 col-xs-12 col-md-2 no-padding card" style={{
        paddingTop: "1.5em"
    }}>
        <div className="card-container">
            <span className="pro">
                <i className="fad fa-user-shield" />
            </span>
            <div className="img-placeholder">
                <img
                    className="round"
                    src="/assets/avatars/256px/2.png"
                    alt="user"
                />
            </div>
            <h3>{data.firstName} {data.lastName}</h3>
            <a href={`mailto:${data.email}`} className="anchor">{data.email}</a>
            <p>
                User interface designer and <br />
                front-end developer
            </p>
        </div>
    </div>
);

export default userCard;
