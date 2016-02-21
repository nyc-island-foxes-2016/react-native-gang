'use strict';

import React, {
  Component,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Board from './Board';
import Dot from './Dot';
import styles from './stylesheet';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class BoardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(), letterPath: ''};
  }

  swap(gameId) {
    this.props.navigator.replace({
      id: 'WaitingPage',
      gameId: gameId,
      player: this.state.player
    });
  }

  postNewGame() {
    fetch(REQUEST_URL + POST_NEW_GAME, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          player: 'Game-' + Math.round(1e6 * Math.random()),
          board: this.state.letterPath
        })
      })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        player: responseData.player
      })
      this.swap(responseData.gameId);
    });
  }

  handleDotClick(row: number, col: number, letter: char) {
    if(this.state.board.isClicked(row, col)) {
      return;
    }

    var letterPath = this.state.letterPath;

    this.setState({
      board: this.state.board.mark(row, col),
      letterPath: letterPath + letter
    });
  }

  render() {
    var letterSet = ['D', 'C', 'B', 'A'];

    var rows = this.state.board.grid.map((dots, row) =>
      <View key={row} style={styles.row}>
        {dots.map((clicked, col) =>
          <Dot
            key={col}
            clicked={clicked}
            onPress={this.handleDotClick.bind(this, row, col, letterSet.pop())}/>
        )}
      </View>
    );

    if(this.state.letterPath.length == 4){
      return (
        <View style={styles.container}>
          <Text style={styles.boardInstructions}>
          {"Your opponent is ready." + '\n' + "Set your speckle pattern" + '\n' + "and submit to play!"}
          </Text>
          <View>
            {rows}
          </View>
          <TouchableHighlight
            onPress={this.postNewGame.bind(this)}
            underlayColor='transparent'>
            <Text style={styles.boardButton}>
              Submit Board
            </Text>
          </TouchableHighlight>
        </View>
        );
      }
      return (
        <View style={styles.container}>
          <Text style={styles.boardInstructions}>
          {"Your opponent is ready." + '\n' + "Set your speckle pattern" + '\n' + "and submit to play!"}
          </Text>
          <View>
            {rows}
          </View>
          <TouchableHighlight
            underlayColor='transparent'>
            <Text style={styles.boardButton}>
              Submit Board
            </Text>
          </TouchableHighlight>
        </View>
      );
  }
}

module.exports = BoardEntry;
