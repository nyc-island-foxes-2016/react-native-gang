'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import MultipeerConnectivity from 'react-native-multipeer';
import StartGameOverlay from './Instructions';
import styles from './stylesheet';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 0
    };
  }

  swap() {
    this.props.navigator.replace({
      id: 'BoardEntry'
    });
  }

  goToJoinGame(peer) {
    MultipeerConnectivity.invite(peer.id);
    console.log('connected to peer from mainpage: ', peer)
    this.props.navigator.replace({
      id: 'JoinGame',
      peer: peer
    });
  }

  render() {
    console.log('randPeer in mainpage', this.props.randPeer);
    if (this.props.randPeer) {
      return(
        <View style={styles.container}>
          <TouchableHighlight onPress={this.swap.bind(this)}>
            <Text style={styles.button}>Post New Board</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.goToJoinGame.bind(this, this.props.randPeer)}>
            <Text style={styles.button}>Play</Text>
          </TouchableHighlight>
          <StartGameOverlay
            atStart = {this.props.atStart}/>
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text style={styles.button}>Post New Board</Text>
        </TouchableHighlight>
        <StartGameOverlay
          atStart = {this.props.atStart}/>
      </View>
    );
  }
}

module.exports = MainPage;
