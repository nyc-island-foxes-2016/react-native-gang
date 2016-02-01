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
//var POST_NEW_GAME = '/games'
//post to check for a player 2 - use swap to go to empty board to play (doesnt exist yet)
//destroy route to close game board and return to home - use swap to change nav to main page

class WelcomePage extends Component {
  constructor() {
    super();
    this.state = {};
  }




  render() {
    return (
      <View>
      //view for waiting page
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

module.exports = MainPage;

