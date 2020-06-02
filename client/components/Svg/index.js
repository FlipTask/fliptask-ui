import React from "react";
import loadable from '@loadable/component';

const Icon = loadable(props => import(`../../svg/${props.name}.svg`));

const Svg = (props) => (
    <React.Fragment>
        <Icon {...props} name={props.name} />
    </React.Fragment>
);

export default Svg;