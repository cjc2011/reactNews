var React = require('react');

import PCHeader from './pcHeader';
import PCfooter from './pcFooter';
import PCNewsImgBlock from './pcNewsImgBlock';
import CommonComments from './common_comments'
import { Row, Col, BackTop} from 'antd';

export default class pcDetail extends React.Component{
  constructor() {
    super();
    this.state = {
      newsItem: ''
    }
  };
  componentDidMount() {
    var myFeatchOptions = {
      methods:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.params.uniquekey, myFeatchOptions)
    .then(response=>response.json())
    .then(json=>{
      this.setState({newsItem:json});
      document.title = this.state.newsItem.title+"- React Demo";
    })
  };

  createMarkup(){
    return {__html:this.state.newsItem.pagecontent};
  };

  render() {
    return (
      <div>
        <PCHeader />
        <Row>
          <Col span={2}></Col>
          <Col span={14}>
            <div class="articleContainer"  dangerouslySetInnerHTML={this.createMarkup()}></div>
            <CommonComments uniquekey={this.props.params.uniquekey}/>
          </Col>
          <Col span={6}>
              <PCNewsImgBlock count={20} type="top" width="100%" cartTitle="相关咨询" imageWidth="150px" />
          </Col>
          <Col span={2}></Col>
        </Row>

        <PCfooter />
        <BackTop />
      </div>
    )
  }
}
