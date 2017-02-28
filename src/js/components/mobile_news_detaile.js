var React = require('react');

import MobileHeader from './mobile_header';
import Mobilefooter from './mobile_footer';
import CommonComments from './common_comments'
import { Row, Col, BackTop} from 'antd';

export default class MobileDetail extends React.Component{
  constructor() {
    super();
    this.state = {
      newsItem: ''
    }
  };
  componentDidMount() {
    document.body.scrollTop = '0px';
    var myFeatchOptions = {
      methods:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFeatchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({newsItem:json});
      console.log(this.state.newsItem);
      document.title = this.state.newsItem.title+"- React Demo";
    })
  };

  createMarkup(){
    return {__html:this.state.newsItem.pagecontent};
  };

  render() {
    return (
      <div id="mobileDetailsContainer">
        <MobileHeader />
          <div className="ucmobileList">
            <Row>
              <Col span={24}>
                <div class="articleContainer"  dangerouslySetInnerHTML={this.createMarkup()}></div>
                <CommonComments uniquekey={this.props.params.uniquekey}/>
              </Col>
            </Row>
            <Mobilefooter />
            <BackTop />
          </div>
      </div>
    )
  }
}
