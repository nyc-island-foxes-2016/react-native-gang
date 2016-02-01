'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var REQUEST_URL = 'http://localhost:3000'
var GET_CURRENT_GAME = '/games/'
var GET_IF_JOINED = '/joined'

//destroy route to close game board and return to home - use swap to change nav to main page

class WaitingPage extends Component {
  constructor(props) {
    super(props);
  }

  swap(page_name) {
    this.props.navigator.replace({
      id: 'GameView',
      gameId: this.props.gameId,
      player: this.props.player
    });
  }

  componentDidMount() {
    this.getPlayer2Joined().bind(this);
  }

  getPlayer2Joined() {
    fetch(REQUEST_URL + GET_CURRENT_GAME + this.props.gameId + GET_IF_JOINED)
      .then((response) => response.json())
      .then((responseText) => {
        if(responseText.result === "Yes"){
          this.swap('MainPage'); /////make this the game page!!!
        }
        else {
          setTimeout(() => {
            this.getPlayer2Joined();
            }, 500);
        }
      });
    }

  deleteGame() {
    fetch(REQUEST_URL + GET_CURRENT_GAME + this.props.gameId, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    }).then((response) => response.json())
      .then((responseText) => {
        if(responseText.result === "Yes"){
          this.swap('MainPage');
        }
      });
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style = {styles.welcome}>
          Waiting....
        </Text>
      <TouchableHighlight onPress = {this.deleteGame.bind(this)}>
        <Text>
          Go back to start!
        </Text>
      </TouchableHighlight>
      </View>
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
  }
});

module.exports = WaitingPage;
