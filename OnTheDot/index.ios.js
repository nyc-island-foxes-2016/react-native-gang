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

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'


class MainPage extends Component {
  swap() {
    this.props.navigator.replace({
      id: 'Board'
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Main page here</Text>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text>Goto Board</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class Board extends Component {
  swap() {
    this.props.navigator.replace({
      id: 'MainPage'
    });
  }

  postNewGame() {
    fetch(REQUEST_URL + POST_NEW_GAME, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({player1: "Sasha"})
    }).then((response)=> response.json()).then((responseData) => {
    console.log(responseData);
    AlertIOS.alert(
        "POST Response",
        "Response Body -> " + JSON.stringify(responseData.body)
    )});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a board</Text>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text>Post your board!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class OnTheDot extends Component {

  renderScene(route, navigator) {
    var routeId = route.id;
    if(routeId === 'MainPage') {
      return (
        <MainPage navigator={navigator}/>
      );
    }
    else if(routeId === 'Board') {
      return (
        <Board navigator={navigator}/>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('OnTheDot', () => OnTheDot);
