import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


export default class App extends React.Component {
  render() {
    return (
      <Loader
        style={{textAlign: "center"}}
        type="Hearts"
        color="#ff009d"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }
}