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

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={Colors.grey400} />
  </IconButton>
)

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Edit</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
)

const ArticleList = () => (
  <div>
  <StatusBar>
    <Header />
  </StatusBar>
  <List>
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
      linkButton={true} containerElement={<Link to="/preview" />}
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
    <ListItem
      rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText="2012-3-23"
    />
  </List>
  </div>

);

export default ArticleList;