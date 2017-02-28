var React = require('react');
import MobileHeader from './mobile_header'
import MobileFooter from './mobile_footer'
import Mobile from './mobile'

import { Tabs, Carousel } from 'antd';
const TabPane = Tabs.TabPane;

export default class mobileIndex extends React.Component{
  render(){
    const settings = {
      dots:true,
      infinite:true,
      speed:500,
      slidesToShow:1,
      autoplay:true
    };

    return(
      <div>
        <MobileHeader />
        <Tabs>
          <TabPane tab="头条" key='1'>
            <div className="mobile_swiper">
              <Carousel {...settings} >
                <div><img src="./src/image/carousel_1.jpg" /></div>
                <div><img src="./src/image/carousel_2.jpg" /></div>
                <div><img src="./src/image/carousel_3.jpg" /></div>
                <div><img src="./src/image/carousel_4.jpg" /></div>
              </Carousel>
            </div>
            <Mobile count={20} type="top"  />
          </TabPane>
          <TabPane tab="社会" key='2'>
              <Mobile count={20} type="shehui" />
          </TabPane>
          <TabPane tab="国内" key='3'>
              <Mobile count={20} type="guonei" />
          </TabPane>
          <TabPane tab="国际" key='4'>
              <Mobile count={20} type="guoji" />
          </TabPane>
          <TabPane tab="娱乐" key='5'>
              <Mobile count={20} type="yule" />
          </TabPane>
          <TabPane tab="体育" key='6'>
              <Mobile count={20} type="tiyu" />
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>

    )
  }
}
