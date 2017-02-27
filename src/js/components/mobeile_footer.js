
var React = require('react');

import { Row, Col } from 'antd';

export default class mobeileFooter extends React.Component{
  render(){
    return(
        <footer>
          <Row>
            <Col span={2}></Col>
            <Col span={20} className="mobeile_footer">
              &copy;2016 ReactNews. All Right Reseved
            </Col>
            <Col span={2}></Col>
          </Row>
        </footer>
    )
  }
}
