'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import StartGameOverlay from './Instructions';
import styles from './stylesheet'

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {gameId: 0}
  }

  componentDidMount() {
    this.getWaitingGames();
  }

  getWaitingGames() {
    fetch(REQUEST_URL + '/games/waiting')
      .then((response) => response.json())
      .then((responseData) => {
      this.setState({
        gameId: responseData[0]
      });
      }).done();
  }

  swap() {
      this.props.navigator.replace({
        id: 'BoardEntry'
      });
  }

  goToJoinGame(gameId) {
    this.props.navigator.replace({
      id: 'JoinGame',
      gameId: gameId
    });
  }

  render() {
    if (this.state.gameId == 0) {
      return(
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Main page here
            </Text>
          <TouchableHighlight onPress={this.swap.bind(this)}>
            <Text>New Board</Text>
          </TouchableHighlight>
          <StartGameOverlay
            atStart = {this.props.atStart}/>
        </View>
      );
    }

    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main page here
          </Text>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text>New Board</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.goToJoinGame.bind(this, this.state.gameId)}>
          <Text>Join a Game</Text>
        </TouchableHighlight>
        <StartGameOverlay
          atStart = {this.props.atStart}/>
      </View>
    );
  }
}

module.exports = MainPage;
