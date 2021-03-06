import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'
import Header from './header.js'
import StatusBar from '../util/status-bar'
import Navigator from '../util/navigator'
import connect from '../../lib/connect.js'
import dateFormat from '../../lib/date-format.js'
import ActionDelete from 'material-ui/svg-icons/action/delete';



const iconButtonElement = (
  <IconButton
    touch={true}
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={"grey400"} />
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
      articles: [],
      originList: []
    }
  }
  delete = id => {
    connect.child('note').child(connect.getAuth().auth.uid).child(id).once('value', snapshot => {
        connect.child('recycle').child(connect.getAuth().auth.uid).push(snapshot.val())
        connect.child('note').child(connect.getAuth().auth.uid).child(id).remove()
    })
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
      this.setState({
        originList: list,
        articles: list
      })
    }, errorObject => {
      console.log("The read failed: " + errorObject.code);
    })
  }
  componentDidMount = () => {
    this.getList()
  }
  articlesFilter = (keyword) => {
    const newList = []
    this.state.originList.forEach(item => {
      if (~item.note.indexOf(keyword) || ~item.title.indexOf(keyword)) {
        newList.push(item)
      }
    })
    this.setState({articles: newList})
  }
  render () {
    return (
      <div>
      <Navigator />
      <StatusBar>
        <Header filter={this.articlesFilter}/>
      </StatusBar>
      <List>
        {
          this.state.articles.map((item, index) => {
            return (<ListItem
              key={item.id}
              rightIconButton={
                <IconButton
                  onClick={e =>{
                    e.preventDefault()
                    e.stopPropagation()
                    this.delete(item.id)
                  }}>
                  <ActionDelete />
                </IconButton>
              }
              primaryText={item.title}
              secondaryText={dateFormat(new Date(item.time), 'yyyy-MM-dd hh:mm:ss')}
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
