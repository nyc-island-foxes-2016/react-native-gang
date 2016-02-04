'use strict';
import React, {
  Component,
  Text,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import Board from './Board';
import Dot from './Dot';
import EndGame from './EndGame';
import MultipeerConnectivity from 'react-native-multipeer';
import styles from './stylesheet';

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Board(),
      letterPath: '',
      isOver: false
    };
    console.log('props in gameview', props);
  }

  componentDidMount() {
    MultipeerConnectivity.on('data', (event) => {
      console.log('in-game data', event.data);
      if(event.data.type === 'guess') {
        var peer = this.props.peer;
        var result = this.isCorrectPath(this.props.playerPath, event.data.path);
        console.log('playerPath in data listener', this.props.playerPath);
        console.log('peer in data received', peer);
        console.log('isCorrectPath response:', result);

        MultipeerConnectivity.send(
          [peer.id],
          {result: result, type: 'response'}
        );
      }
      else if(event.data.type === 'response') {
        var result = event.data.result;
        console.log('response', result);
        if(result === 'false'){
          this.setState({
            board: new Board(),
            letterPath: '',
            isOver: false
          });
        }
        else if(result === 'true') {
          this.clickDot.bind(this, this.state.guessRow, this.state.guessCol);
          if(this.state.letterPath.length === 4) {
            this.setState({
              isOver: true,
              result: 'You Win!'
            });
            this.setGameOver();
          }
        }
      }
      else if(event.data.type === 'gameover') {
        this.setState({
          isOver: true,
          result: 'You lose.'
        });
      }
    });
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage',
      atStart: false
    });
  }

  sendPathGuess(row: number, col: number, letter: char) {
    this.setState({
      board: this.state.board,
      letterPath: this.state.letterPath + letter,
      isOver: this.state.isOver,
      guessRow: row,
      guessCol: col
    });
    var path = this.state.letterPath;
    var peer = this.props.peer;
    console.log('peer in sendPathGuess', peer);
    console.log('sending path to opponent: ', this.props.peer, 'path:', path);
    MultipeerConnectivity.send(
      [peer.id],
      {path: path, type: 'guess'},
    );
  }

  isCorrectPath(playerPath, opponentPath) {
    var matcher = new RegExp('^' + opponentPath);
    if(playerPath.match(matcher)) {
      return 'true';
    }
    return 'false';
  }

  clickDot(row, col) {
    if(this.state.board.isClicked(row, col)) {
      return;
    }

    this.setState({
      board: this.state.board.mark(row, col),
      letterPath: this.state.letterPath,
      isOver: false
    });
  }

  setGameOver() {
    var peer = this.props.peer;
    console.log('peer in setGameOver', peer);
    MultipeerConnectivity.send(
      [peer.id],
      {data: 'you lose', type: 'gameover'}
    );
  }

  render() {
    if(this.state.isOver) {
      var dotColor = 'clickedDot';
      if(this.state.result === 'You Win!') {
        dotColor = 'winDot';
      }
      else if(this.state.result === 'You lose.') {
        dotColor = 'loseDot';
      }
      var rows = this.state.board.grid.map((dots, row) =>
        <View key={row} style={styles.row}>
          {dots.map((clicked, col) =>
            <View
              key={col}
              style={[styles.dot, styles[dotColor]]}/>
          )}
        </View>
      );
    }
    else{
      var letterSet = ['D', 'C', 'B', 'A'];

      var rows = this.state.board.grid.map((dots, row) =>
        <View key={row} style={styles.row}>
          {dots.map((clicked, col) =>
            <Dot
              key={col}
              clicked={clicked}
              onPress={this.sendPathGuess.bind(this, row, col, letterSet.pop())}/>
          )}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.boardInstructions}>
        {"Decode your opponent's board"}
        </Text>
        <Text style={styles.boardInstructions}>
        {"before they solve yours!"}
        </Text>
          {rows}
        <EndGame
          isOver={this.state.isOver}
          result={this.state.result}
          onSwap={this.swap.bind(this)}/>
      </View>
    );
  }

}

module.exports = GameView;
