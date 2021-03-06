import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ContentSave from 'material-ui/svg-icons/content/save'
import IconBack from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import {Link} from 'react-router'
import {Actions} from '../../stores/nav.js'
import connect from '../../lib/connect.js'
import Wilddog from 'wilddog'

export default class EditorHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
  }
  save = () => {
    if (this.props.postKey) {
      connect.child('note').child(connect.getAuth().auth.uid).child(this.props.postKey).set({
        note: this.props.note,
        title: this.props.note.match(/^(?=# ).*/g) ? this.props.note.match(/^(?=# ).*/g)[0].split('# ')[1] : 'No Title',
        time: Wilddog.ServerValue.TIMESTAMP
      })
    } else {
      const postKey = connect.child('note').child(connect.getAuth().auth.uid).push({
        note: this.props.note,
        title: this.props.note.match(/^(?=# ).*/g) ? this.props.note.match(/^(?=# ).*/g)[0].split('# ')[1] : 'No Title',
        time: Wilddog.ServerValue.TIMESTAMP
      }).key()
      this.props.router.push(`/editor/${postKey}`)
    }
  }
  render() {
    return (
        <AppBar
          title='Editor'
          iconElementLeft={<IconButton onClick={() => {this.context.router.push('/article-list')}}><IconBack /></IconButton>}
          iconElementRight={<IconButton onClick={this.save}><ContentSave /></IconButton>}
          />
    );
  }
}
