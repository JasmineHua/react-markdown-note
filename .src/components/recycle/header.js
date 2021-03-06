import React from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import connect from '../../lib/connect.js'
import {Actions} from '../../stores/nav.js'

export default class MainHeader extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  openConfirm = () => {
    this.setState({open: true})
  }
  closeConfirm = () => {
    this.setState({open: false})
  }
  toggleNav (e) {
    e.stopPropagation()
    e.preventDefault()
    Actions.toggleNav(true)
  }
  deleteAll = () => {
      connect.child('recycle').child(connect.getAuth().auth.uid).remove(err => {
        !err && this.props.refresh()
      })
      this.closeConfirm()
  }
  render() {
    return (
        <AppBar
          title='Markdown Note'
          iconElementLeft={<IconButton onClick={this.toggleNav}><NavigationMenu /></IconButton>}
          iconElementRight={<IconButton onClick={this.openConfirm}><ActionDelete /></IconButton>}
          children={
            <Dialog
              title="Confirm to delete"
              actions={[
                <FlatButton
                  label="YES"
                  secondary={true}
                  onClick={this.deleteAll}
                />,
                <FlatButton
                  label="NO"
                  primary={true}
                  keyboardFocused={true}
                  onClick={this.closeConfirm}
                />
              ]}
              modal={false}
              open={this.state.open}
              onRequestClose={this.closeConfirm}>
              Are you sure that you want to permanently delete all these notes ?
            </Dialog>
          }
          />
    );
  }
}
