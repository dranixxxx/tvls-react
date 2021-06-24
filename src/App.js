import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Laso from './components/Laso';
import axios from 'axios';
import Context from "./context/Context";

class App extends React.Component {
    state = {
    sao: null,
    loigiai:null,
  };

  componentDidMount() {
    // grab token value from cookie
      axios.get(`http://localhost:1337/saos?_limit=-1`, {
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        const sao = await res.data;
        this.setSao(sao);
      });
      axios.get(`http://localhost:1337/loigiais?_limit=-1`, {
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        const loigiai = await res.data;
        this.setLoigiai(loigiai);
      });
  }

  setSao = (sao) => {
    this.setState({ sao });
  };
  setLoigiai = (loigiai) => {
    this.setState({ loigiai });
  };
  render() {
    return (
        <Context.Provider
        value={{
          sao: this.state.sao,
          loigiai: this.state.loigiai,
          setSao: this.setSao,
          setLoigiai: this.setLoigiai,
        }}
        >
          <Laso/>
        </Context.Provider>
    );
  }
}

export default App;
