var React = require('react');
import { Router, Route,Link,hashHistory } from 'react-router';

import {
  Row,
  Col,
  Card,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  notification,
  CheckBox,
  Button,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class CommonComments extends React.Component{
  constructor() {
    super();
    // P.S: 仅能在构造函数中设置 state
    // 在其他地方绝不能使用 this.state.XXX = XXX
    // 只能使用 this.setState({ XXX: XXX })
    this.state = {
      comments:''
    }
  };
  //获取用户评论列表
  componentWillMount() {
    var myFeatchOptions = {
      methods:'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFeatchOptions)
    .then(response=>response.json()).then(json=>{
      console.log(json)
      this.setState({comments:json});
    })
  };
  //提交评论内容
  handleSubmint(e) {
    e.preventDefault();
    var myFetchOptions = {
      method: 'GET'
    };
    var formdata = this.props.form.getFieldsValue();
    if(!localStorage.userId){
      return notification['error']({message: '错误', description: '请登录'});
    }
    if(!formdata.remark){
      return notification['error']({message: '错误', description: '请输入内容'});
    }
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey + "&commnet=" + formdata.remark, myFetchOptions).then(response => response.json()).then(json => {
      this.props.form.setFields({
          remark : {
            value:''
          }
      })
      this.componentWillMount();
    })
  };
  //收藏文章
  addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};
    if(!localStorage.userId){
      notification['error']({message: '收藏失败', description: '请登录'});
      return;
    }
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userId + "&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			//收藏成功以后进行一下全局的提醒
			notification['success']({message: 'ReactNews提醒', description: '收藏此文章成功'});
		});
	};

  render() {
      let { getFieldDecorator } = this.props.form;
      const { comments } = this.state;
      const comnetList = comments.length
      ?
      comments.map((item,index)=>(
         <Card key={index} title={item.UserName} extra={<a href="javascript:;">发表于{item.datetime}</a>}>
             <p>{item.Comments}</p>
         </Card>
      ))
       :
      '暂无评论';
      return(
        <div>
          <Row>
            <Col span={24}>
              {comnetList}
              <Form onSubmit = {this.handleSubmint.bind(this)}>
                  <FormItem label="您的评论">
                    {getFieldDecorator('remark')(
                       <Input type="textarea" placeholder="请填写您的评论"/>
                     )}
                  </FormItem>
                  <Button type="primary" htmlType="submit">提交</Button>
                    &nbsp;&nbsp;
    							<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
              </Form>
            </Col>
          </Row>
        </div>
      )
  }
};

export default CommonComments = Form.create({})(CommonComments)
