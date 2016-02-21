'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View
} from 'react-native';
import Bouncing from './Bouncing';
import styles from './stylesheet';

var REQUEST_URL = 'http://localhost:3000'
var GET_CURRENT_GAME = '/games/'
var GET_IF_JOINED = '/joined'

//destroy route to close game board and return to home - use swap to change nav to main page

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  swap(page_name) {
    this.props.navigator.replace({
      id: page_name,
      gameId: this.props.gameId,
      player: this.props.player,
      atStart: false
    });
  }


  componentDidMount() {
    this.getPlayer2Joined();
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
          <Text style = {styles.ditchPageText}>
            Waiting For Another Player to Join...
          </Text>
        </View>
          <ActivityIndicatorIOS
            color="#D40145"
            size="large"/>
          <TouchableHighlight
            onPress = {this.deleteGame.bind(this)}
            underlayColor='transparent'>
            <Text style={styles.ditchButton}>
              {"Ditch This Game"}
            </Text>
          </TouchableHighlight>
      </View>
      );
    }
  }

module.exports = WelcomePage;
