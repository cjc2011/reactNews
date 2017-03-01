var React = require('react');
import PCNewsBlock from './pcNewsBlock';
import PCNewsImgBlock from './pcNewsImgBlock';
import PCproduct from './pc_products.js'
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
              <PCNewsImgBlock count={6} type="guoji" width="400px" cartTitle="国际头条" imageWidth="112px"></PCNewsImgBlock>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab="新闻" key='1'>
                <PCNewsBlock width="100%" bordered="false" count={22} type="top" />
              </TabPane>
              <TabPane tab="国际" key='2'>
                <PCNewsBlock width="100%" bordered="false" count={22} type="guoji" />
              </TabPane>
            </Tabs>
            <Tabs class="tabs_product">
              <TabPane tab="React 产品" key="1">
                <PCproduct />
              </TabPane>
            </Tabs>
            <div>
                <PCNewsImgBlock count={8} type="guonei" width="100%" cartTitle="国内新闻" imageWidth="132px"></PCNewsImgBlock>
                <PCNewsImgBlock count={16} type="yule" width="100%" cartTitle="娱乐八卦" imageWidth="132px"></PCNewsImgBlock>
            </div>
          </Col>
          <Col span={2}></Col>
        </Row>
    )
  }
}
