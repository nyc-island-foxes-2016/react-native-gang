'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Bouncing from './Bouncing';
import MultipeerConnectivity from 'react-native-multipeer';
import styles from './stylesheet';

var REQUEST_URL = 'http://localhost:3000'
var GET_CURRENT_GAME = '/games/'
var GET_IF_JOINED = '/joined'

//destroy route to close game board and return to home - use swap to change nav to main page

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  swap(page_name, peer) {
    console.log('we hit swap?');
    this.props.navigator.replace({
      id: page_name,
      gameId: this.props.gameId,
      player: this.props.player,
      atStart: false,
      peer: peer
    });
  }

  componentDidMount() {
    this.getPlayer2Joined();
    var playerPath = this.props.playerPath;
    MultipeerConnectivity.on('data', (event) => {
      console.log('got a message:', event.data);
      console.log('this in waiting page message:', this);
      var peer;
      if(event.data.peer) {
        peer = event.data.peer.id;
      }
      this.props.navigator.replace({
      id: 'GameView',
      atStart: false,
      peer: peer,
      playerPath: playerPath
      });
    });
  }

  getPlayer2Joined() {
    fetch(REQUEST_URL + GET_CURRENT_GAME + this.props.gameId + GET_IF_JOINED)
      .then((response) => response.json())
      .then((responseText) => {
        if(responseText.result === "Yes"){
          this.swap('GameView');
        }
        else {
          setTimeout(() => {
            this.getPlayer2Joined();
            }, 10);
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
        <View>
          <Text style = {styles.welcome}>
            Waiting....
          </Text>
          <TouchableHighlight onPress = {this.deleteGame.bind(this)}>
            <Text style={styles.button}>
              Go back to start!
            </Text>
          </TouchableHighlight>
          <Bouncing/>
        </View>
      </View>
      );
    }
  }

module.exports = WelcomePage;
