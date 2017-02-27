
var React = require('react');
import { Router, Route,Link,hashHistory } from 'react-router';

import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  CheckBox,
  Button,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
 class PCHeader extends React.Component{
  constructor() {
    super();
    this.state = {
      current:'top',                   //用于设置导航栏默认选中
      modelVisible:false,              //设置弹层隐藏显示
      action:'login',                   //点击切换登录还是注册
      hasLogined:false,                //是否登录
      userName:'',                      //用户名
      userID:0                         //用户ID
    }
  };
  //在组件创建时读取localstroge 判断是否登录
  componentWillMount() {
    if(localStorage.userName && localStorage.userId){
      this.setState({hasLogined:true,userName:localStorage.userName,userID:localStorage.userId})
    }
  };
  //设置遮挡层显示事件
  setModelVisible(value) {
    this.setState({modelVisible:value})
  };
 //设置顶部导航栏active事件
  handleClick(e) {
    if(e.key == 'register'){
      this.setState({current:'top'});
      this.setModelVisible(true)
    }else{
      this.setState({current:e.key});
    }
  };
  //注册和登录的提交事件
  handleSubmint(e) {
    //阻止默认行为
    e.preventDefault();
    //定义请求数据的配置项
    var myFetchOption = {
      method:'GET'
    };
    //获取表单内的数据
    var formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
    + "&username="+formData.userName
    +"&password="+formData.r_password
    +"&r_userName=" + formData.r_userName
    +"&r_password="+ formData.r_password
    +"&r_confirmPassword="+ formData.r_confirmPassword, myFetchOption).
    then(response=>response.json()).
    then(json=>{
      if(this.state.action == 'login'){
        if(json){
          message.success('登录成功');
          this.setState({hasLogined:true})
          this.setState({userName:json.NickUserName,userID:json.UserId});
          localStorage.userName = json.NickUserName;
          localStorage.userId = json.UserId;
          this.props.form.setFields({
              userName : {
                value:''
              },
              passWord : {
                value:''
              }
          })
          this.setModelVisible(false);
        }else{
          message.error('用户错误');
        }
      }
      if(this.state.action == 'register'){
          message.success('注册成功');
          this.setModelVisible(false);
      }
    });
  };
  loginOut(){
    this.setState({hasLogined:false});
    localStorage.userName='';
    localStorage.userId='';
  };
  //遮挡层切换事件
  callback(key){
    //如果传入的下标为1  则把状态切换到登录
    if(key == 1){
      this.setState({action:'login'})
    }
    //如果传入的下标为2  则把状态切换到注册
    else if(key == 2){
      this.setState({action:'register'})
    }

  }

  render(){
    let { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined
    ?
    <Menu.Item key="login" className="register">
      <Button type="primary"  htmlType="button">{this.state.userName}</Button>
      &nbsp;&nbsp;
      <Link target="_blank" to="#/">
        <Button type="dashed" htmlType="button">个人中心</Button>
      </Link>
      <Button htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
    </Menu.Item>
    :
    <Menu.Item key="register" className="register">
      <Icon type="appstore" />注册/登录
    </Menu.Item>

    return(
        <header>
          <Row>
            <Col span={2}>2</Col>
            <Col span={4}>
              <a href="/" className="logo">
                <img src="./src/image/logo.png" alt="logo" />
                <span>ReactNews</span>
              </a>
            </Col>
            <Col span={16}>
              <Menu
                selectedKeys={[this.state.current]}
                mode="horizontal"
                onClick={this.handleClick.bind(this)}
              >
                <Menu.Item key="top">
                  <Icon type="appstore"/>头条
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="tags-o" />社会
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="bulb" />国内
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="ie" />国际
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="eye" />娱乐
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="area-chart" />体育
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="github" />科技
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="apple" />时尚
                </Menu.Item>
                {userShow}
              </Menu>

              <Modal
                title="用户中心"
                wrapClassName="vertical-center-modal"
                visible={this.state.modelVisible}
                onCancel={()=>this.setModelVisible(false)}
                onOk={()=>this.setModelVisible(false)}
                okText="关闭">
                <Tabs type="card" onChange={this.callback.bind(this)}>

                  <TabPane tab="登录" key="1">
                    <Form horizontal onSubmit={this.handleSubmint.bind(this)}>
                      <FormItem label="账户">
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input addonBefore={<Icon type="user" />} placeholder="请输入您的帐号..." />
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('passWord', {
                          rules: [{ required: true, message: 'Please input your userpassWord!' }],
                          })(
                            <Input addonBefore={<Icon type="lock"  />} type="password" placeholder="请输入您的密码..." />
                          )}
                      </FormItem>
                      <Button type="primary" htmlType="submit">登录</Button>
                    </Form>
                  </TabPane>

                  <TabPane tab="注册" key="2">
                    <Form horizontal onSubmit={this.handleSubmint.bind(this)}>
                      <FormItem label="账户">
                        {getFieldDecorator('r_userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input addonBefore={<Icon type="user" />} placeholder="请输入您的帐号..." />
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('r_passWord', {
                          rules: [{ required: true, message: 'Please input your userpassWord!' }],
                          })(
                            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入您的密码..." />
                          )}
                      </FormItem>
                      <FormItem label="确认密码">
                      {getFieldDecorator('r_confirmenPassWord', {
                        rules: [{ required: true, message: 'Please input your userpassWord!' }],
                        })(
                          <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请输入您的密码..." />
                        )}
                      </FormItem>
                      <Button type="primary" htmlType="submit">注册</Button>
                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>
            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
    )
  }
}

export default PCHeader = Form.create({})(PCHeader);
