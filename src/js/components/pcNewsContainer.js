var React = require('react');
import PCNewsBlock from './pcNewsBlock'

import { Row, Col, Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;

export default class PCnewsContainer extends React.Component{
  render() {
    const settings = {
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    }
    return(
        <Row>
          <Col span={2}></Col>
          <Col span={20} className="container">
            <div className="leftContainer">
              <div className="carousel">
                <Carousel {...settings} >
                  <div><img src="./src/image/carousel_1.jpg" /></div>
                  <div><img src="./src/image/carousel_2.jpg" /></div>
                  <div><img src="./src/image/carousel_3.jpg" /></div>
                  <div><img src="./src/image/carousel_4.jpg" /></div>
                </Carousel>
              </div>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="新闻" key='1'>
                <PCNewsBlock width="100%" count={22} type="top" />
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>
    )
  }
}
