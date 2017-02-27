var React = require('react');
import { Router, Route,Link,hashHistory } from 'react-router';

import { Card } from 'antd';

export default class pcNewsBlock extends React.Component{

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
        this.setState({news:json});
    });
  };

  render(){
    const { news } = this.state;
    const newList = news.length
    ?
    news.map((item,index)=>(
      <li key={index}>
        <Link to={`details/${item.uniquekey}`} target="_blank">
          {item.title}
        </Link>
      </li>
    ))
    :
    '暂时没有数据';
    console.log(newList)
    return(
      <div className="topNewsList">
        <Card>
          <ul>
            {newList}
          </ul>
        </Card>
      </div>
    )
  }
}
