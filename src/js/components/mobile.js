var React = require('react');
import { Router, Route, Link, hashHistory } from 'react-router';

import { Row, Col } from 'antd';

export default class MobileList extends React.Component{
  constructor(){
    super();
    this.state={
      "news":''
    };
  };

  componentWillMount(){
    var myFeatchOptions = {
      methods:'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type+'&count='+this.props.count)
    .then(response=>response.json())
    .then(json=>{
        this.setState({news:json});
    });
  };

  render(){
    const { news } = this.state;
    const newList = news.length
    ?
    news.map((item,index)=>(
      <section key={index} className="m_article list_item special_section clearflx">
          <Link to={`details/${item.uniquekey}`}>
              <div className="m_article_img">
                  <img src={item.thumbnail_pic_s} alt={item.title} />
              </div>
              <div className="m_article_info">
                  <div className="m_article_title">
                    <span>{item.title}</span>
                  </div>
                  <div className="m_article_desc clearflx">
                     <div className="m_article_desc_l">
                        <span className="m_article_channel">{item.realtype}</span>
                        <span className="m_article_time">{item.date}</span>
                     </div>
                  </div>
              </div>
          </Link>
      </section>
    ))
    :
    '暂时没有数据';
    return(
      <div className="topNewsList">
        <Row>
            <Col span={24}>
              {newList}
            </Col>
        </Row>
      </div>
    )
  }
}
