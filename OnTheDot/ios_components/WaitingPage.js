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
    var playerPath = this.props.playerPath;
    MultipeerConnectivity.on('data', (event) => {
      if(!event.type) {
        console.log('got a message:', event.data);
        this.props.navigator.replace({
        id: 'GameView',
        atStart: false,
        peer: event.data.peer,
        playerPath: playerPath
        });
      }
    });
  }

  deleteGame() {
    console.log('#deleteGame');
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
