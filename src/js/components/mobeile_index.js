var React = require('react');
import MobeileHeader from './mobeile_header'
import MobeileFooter from './mobeile_footer'

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class mobeileIndex extends React.Component{
  render(){
    return(
      <div>
        <MobeileHeader />
        <Tabs>
          <TabPane tab="头条" key='1'>

          </TabPane>
          <TabPane tab="社会" key='2'>

          </TabPane>
          <TabPane tab="国内" key='3'>

          </TabPane>
          <TabPane tab="国际" key='4'>

          </TabPane>
          <TabPane tab="娱乐" key='5'>

          </TabPane>
          <TabPane tab="体育" key='6'>

          </TabPane>
        </Tabs>
        <MobeileFooter />
      </div>

    )
  }
}
