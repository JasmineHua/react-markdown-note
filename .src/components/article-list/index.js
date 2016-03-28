import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import {Link} from 'react-router'
import Header from './header.js'
import StatusBar from '../util/status-bar'
import Navigator from '../util/navigator'
import connect from '../../lib/connect.js'



const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
)

const RightIconMenu = props => (<IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem containerElement={<Link to={{pathname: `/editor/${props.id}`}}/>}>Edit</MenuItem>
    <MenuItem containerElement={<Link to={{pathname: `/editor/${props.id}`}}/>}>Delete</MenuItem>
  </IconMenu>)

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }
  delete = id => {
    // console.log(id)
    connect.child('note').child(connect.getAuth().auth.uid).child(id).remove()
    this.getList()
  }
  getList = () => {
    connect.child('note').child(connect.getAuth().auth.uid).orderByChild('time').once("value", snapshot => {
      let list = []
      snapshot.forEach(snap => {
        let value = snap.val()
        value.id = snap.key()
        list.unshift(value)
      })
      this.setState({articles: list})
    }, errorObject => {
      console.log("The read failed: " + errorObject.code);
    })
  }
  componentDidMount = () => {
    this.getList()
  }
  render () {
    return (
      <div>
      <Navigator />
      <StatusBar>
        <Header />
      </StatusBar>
      <List>
        {
          this.state.articles.map((item, index) => {
            return (<ListItem
              key={item.id}
              rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
                  <MenuItem containerElement={<Link to={{pathname: `/editor/${item.id}`}}/>}>Edit</MenuItem>
                  <MenuItem onTouchTap={e => {this.delete(item.id)}}>Delete</MenuItem>
                </IconMenu>}
              primaryText={item.title}
              secondaryText={((date, fmt) => {
                  var o = {
                    "M+": date.getMonth() + 1,
                    "d+": date.getDate(),
                    "h+": date.getHours(),
                    "m+": date.getMinutes(),
                    "s+": date.getSeconds(),
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    "S": date.getMilliseconds()
                  };
                  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                  for (var k in o)
                  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                  return fmt;
                })(new Date(item.time), 'yyyy-MM-dd hh:mm:ss')}
              linkButton={true} containerElement={<Link to={{pathname: `/preview/${item.id}`}}/>}
            />)
          })
        }
      </List>
      </div>
    )
  }
}

export default ArticleList;
