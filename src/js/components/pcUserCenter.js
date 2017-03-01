var React = require('react');
import { Router, Route,Link,hashHistory } from 'react-router';
import PCheader from './pcHeader';
import PCfooter from './pcFooter';

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
  Modal,
  Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class pcUserCenter extends React.Component{
  constructor() {
    super();
    this.state = {
      usercomments:'',
      usercollection:'',
      previewImage:'',
      previewVisible:false
    }
  };

  componentDidMount() {
    var myFetchOptions = {
			method: 'GET'
		};
    //获取用户收藏列表
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});
    //获取用户评论
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userId, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
  };

  handleCancel(){
    this.setState({previewVisible:false})
  };


  render(){

    const { usercollection , usercomments} = this.state;
    const usercenterList = usercollection.length?
    usercollection.map((item,index)=>(
        <Card key={index} title={item.uniquekey} extra={<a href={`/#/details/${item.uniquekey}`}>查看</a>}>
          <p>{item.Title}</p>
        </Card>
      ))
    :'您还没有收藏任何的新闻，快去收藏一些新闻吧。';

    const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'您还没有发表过任何评论。';

    const props = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
        "Access-Control-Allow-Origin":"*"
      },
      listType:'picture-card',
      defaultFileList:[{
        uid:-1,
        name:'xxx.png',
        state: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
      }],
      onPreview:(file) => {
        this.setState({previewImage:file.url,previewVisible:true})
      }
    }

    return(
      <div>
        <PCheader />
        <Row>
          <Col span={2}></Col>
          <Col span={20}>
            <Tabs>
              <TabPane tab="我的收藏栏列表" key="1">
                  <div className="comment">{usercenterList}</div>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                  <div className="comment">{usercommentsList}</div>
              </TabPane>
              <TabPane tab="上传头像" key="3">
                  <Upload {...props}>
                      <Icon type="plus" />
                      <div className='ant-upload-text'>
                          上传头像
                      </div>
                  </Upload>
                  <Modal
                        visible={this.state.previewVisible}
                        footer={null}
                        onCancel={this.handleCancel.bind(this)}>
                        <img src={this.state.previewImage} alt="预览" />
                  </Modal>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={2}></Col>
        </Row>

        <PCfooter />
      </div>

    )
  }

}
