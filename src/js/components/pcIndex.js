
var React = require('react');
import PCHeader from './pcHeader';
import PCnewsContainer from './pcnewsContainer'
import PCfooter from './pcFooter';
export default class pcIndex extends React.Component{
  render(){
    return(
      <div>
        <PCHeader />
        <PCnewsContainer />
        <PCfooter />
      </div>
    )
  }
}
