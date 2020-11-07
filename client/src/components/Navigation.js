import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';

import HomeScreen from '../containers/Home/Home';
import ListarScreen from '../containers/Listar/Listar';
import ManterScreen from '../containers/Manter/Manter';

export default class Navigation extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'search', color: '#3F51B5'},
      { key: 'listar', title: 'Listar', icon: 'list', color: '#009688'},
      { key: 'manter', title: 'Adicionar', icon: 'add', color: '#795548'},
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    listar: ListarScreen,
    manter: ManterScreen,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}