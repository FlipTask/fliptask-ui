import React, { useEffect, useState } from "react";

const StyleInjector = ({ children, classToInject, onAnimationEnd }) => {
    const StyledChildren = () => React.Children.map(children, (child) => React.cloneElement(child, {
        className: `${child.props.className} ${classToInject}`,
        onAnimationEnd
    }));

    return <StyledChildren />;
};

const Animation = ({
    show,
    children,
    mountAnimation,
    unmountAnimation,
    afterClose
}) => {
    const [shouldRender, setRender] = useState(show);

    useEffect(() => {
        if (show) {
            setRender(true);
        }
    },
    [show]);

    const onAnimationEnd = () => {
        if (!show) {
            setRender(false);
            if (afterClose) {
                afterClose();
            }
        }
    };
    return (shouldRender && (
        <StyleInjector
            onAnimationEnd={onAnimationEnd}
            classToInject={`${show ? (mountAnimation || "slideIn") : (unmountAnimation || "slideOut")}`}>
            {children}
        </StyleInjector>
    ));
};

export default Animation;
