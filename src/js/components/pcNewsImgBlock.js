var React = require('react');
import { Router, Route,Link,hashHistory } from 'react-router';

import { Card } from 'antd';

export default class pcNewsImgBlock extends React.Component{

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
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type='+this.props.type
    +'&count='+this.props.count)
    .then(response=>response.json())
    .then(json=>{
        console.log(this.props.type,)
        this.setState({news:json});
    });
  };

  render(){
    //定义样式
    const styleImg = {
      display:"block",
      width:this.props.imageWidth,
      height:'90px'
    }
    const styleH3 = {
      width:this.props.imageWidth,
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:"ellipsis"
    }
    const { news } = this.state;
    const newList = news.length
    ?
    news.map((item,index)=>(
      <div key={index} className="imageblock">
        <Link to={`details/${item.uniquekey}`} target="_blank">
          <div className="custom-image">
            <img src={item.thumbnail_pic_s} alt="" style={styleImg} />
          </div>
          <div className="custom-card">
            <h3 style={styleH3}>{item.title}</h3>
            <p>{item.author_name}</p>
          </div>
        </Link>
      </div>
    ))
    :
    '暂时没有数据';
    return(
      <div className="topNewsList">
        <Card title={this.props.cartTitle} bordered={true} style={{width:this.props.width}}>
          {newList}
        </Card>
      </div>
    )
  }
}
