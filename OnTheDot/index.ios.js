/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  NavigatorIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class Board extends Component {
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
      <View>
        This is a board
      </View>
      <TouchableHighlight onPress={this.postNewGame}>
        Post your board
      </TouchableHighlight>
    );
  }
}

class OnTheDot extends Component {
  constructor() {
    super();
    this.state = {page: 'main'};
  }

  render() {

    if(this.state.page === 'main') {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={this.state.page = 'board'}>
            <Text style={styles.welcome}>
              Post a new Game
            </Text>
          </TouchableHighlight>
        </View>
      );
    }
    else {
      return (
        <View>
          <Board/>
        </View>
      )
    }
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
