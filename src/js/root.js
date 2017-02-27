var React = require('react');
var ReactDom = require('react-dom');
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pcIndex.js';
import MobeileIndex from './components/mobeile_index.js'

export default class Root extends React.Component{
  render(){
    return(
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <PCIndex />
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <MobeileIndex />
        </MediaQuery>
      </div>
    )
  }
}


ReactDom.render(<Root />,document.getElementById('mainContainer'));
