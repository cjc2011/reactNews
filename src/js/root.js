var React = require('react');
var ReactDom = require('react-dom');
import { Router, Route,Link,hashHistory } from 'react-router';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

import PCIndex from './components/pcIndex.js';
import MobileIndex from './components/mobile_index.js'
import PCDetail from './components/pcDetail.js'
import MobileDetaile from './components/mobile_news_detaile.js'
import PCUserCenter from './components/pcUserCenter'
import MobileUsercenter from './components/mobile_usercenter'

export default class Root extends React.Component{
  render(){
    return(
      <div>
        <MediaQuery query='(min-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={PCIndex}></Route>
            <Route path="/details/:uniquekey" component={PCDetail}></Route>
            <Route path="/usercenter" component={PCUserCenter}></Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width:1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/details/:uniquekey" component={MobileDetaile}></Route>
            <Route path="/usercenter" component={MobileUsercenter}></Route>
          </Router>
        </MediaQuery>
      </div>
    )
  }
}


ReactDom.render(<Root />,document.getElementById('mainContainer'));
