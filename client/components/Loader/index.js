import React from "react";

const animationStyle = `
.spinner {
    width: 40px;
    height: 40px;
  
    position: relative;
    margin: auto;
  }
  
  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }
  
  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }
  
  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }
  
  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
  .page-loader{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0em;
    top: 0;
    background-color: #fff;
    z-index: 1;
    display: flex;
  }
`;

const Loader = () => (
    <React.Fragment>
        <style>
            {animationStyle}
        </style>
        <div className="page-loader">
            <div className="spinner">
                <div className="double-bounce1 bg-danger gradient"></div>
                <div className="double-bounce2 bg-neutral gradient"></div>
            </div>
        </div>
    </React.Fragment>
);

export default Loader;
