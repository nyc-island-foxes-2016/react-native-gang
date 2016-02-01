/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Board from './Board';
import BoardEntry from './BoardEntry';
import Dot from './Dot';
import MainPage from './MainPage';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class OnTheDot extends Component {

  renderScene(route, navigator) {
    var routeId = route.id;
    if(routeId === 'MainPage') {
      return (
        <MainPage navigator={navigator}/>
      );
    }
    else if(routeId === 'BoardEntry') {
      return (
        <BoardEntry navigator={navigator}/>
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'MainPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if(route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }
      }/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    padding: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  dot: {
    height: 60,
    width: 60,
    margin: 60,
    borderRadius: 30,
  },
  clickedDot: {
    backgroundColor: '#DA8',
    borderColor: '#642',
    borderStyle: 'solid',
    borderWidth: 4
  },
  unclickedDot: {
    backgroundColor: '#ABC',
    borderColor: '#456',
    borderStyle: 'solid',
    borderWidth: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('OnTheDot', () => OnTheDot);
