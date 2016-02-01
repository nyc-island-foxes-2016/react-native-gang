'use strict';
import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

var REQUEST_URL = 'http://localhost:3000'
// var JOIN_NEW_GAME = '/games/' + GAME_ID + '/accept'

class JoinGame extends Component {


  // setupPlayerTwo() {
  //   fetch(REQUEST_URL + ACCEPT_GAME, {
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'},
  //       //PASSING IN
  //     }
  //   });
  // }


  render() {
    return (
      <View>
        <Text> JOIN PAGE </Text>
      </View>
    );
  }

}

module.exports = JoinGame;
