import React, { Component } from 'react';
import '../assets/mapping.css';
import { ajax } from '../urlHelper';
import Canvas from 'mini-xmind/dist/lib/canvas';
import Toolbar from 'mini-xmind/dist/lib/toolbar';

export default class mapping extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount = () => {
    this.bindKeyDown();
    this.getMapping();
  };

  bindKeyDown = () => {
    document.onkeydown = e => {
      const { ctrlKey, keyCode } = e;

      // ctrl + s
      if (ctrlKey && keyCode === 83) {
        const data = DataCollector.getAll();
        this.send(data);
      }
      return false;
    };
  };

  send = data => {
    const id = this.getMappingId();
    ajax({
      url: 'save',
      params: {
        method: 'POST',
        body: JSON.stringify({ layout: data, id }),
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
      },
      success: result => {
        if (!result) {
          console.error('error with save');
        }
      },
    });
  };

  getMapping = () => {
    const id = this.getMappingId();

    ajax({
      url: `dist/layout/${id}.json`,
      success: data => this.setState({ data }),
    });
  };

  getMappingId = () => {
    const hash = location.hash.split('/');
    return hash[hash.length - 1];
  };

  render = () => {
    const { data } = this.state;
    return (
      <div className="mapping">
        <Toolbar />
        <Canvas data={data} className="canvas" />
      </div>
    );
  };
}