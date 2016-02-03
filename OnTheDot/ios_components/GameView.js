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
import styles from './stylesheet';

var REQUEST_URL = 'http://localhost:3000';
var POST_NEW_GAME = '/games';

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Board(),
      letterPath: '',
      isOver: false
    };
  }

  componentDidMount() {
    this.checkGameExists();
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage',
      atStart: false
    });
  }

  clickDot(row: number, col: number) {
    if(this.state.board.isClicked(row, col)) {
      return;
    }
    clearTimeout(this.state.timeoutId);

    this.setState({
      board: this.state.board.mark(row, col),
      letterPath: this.state.letterPath,
    });
  }

  checkGameExists() {
    fetch(REQUEST_URL + '/games/' + this.props.gameId + '/playing')
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.result == true){
        var timeoutId = setTimeout(() => {
          this.checkGameExists();
        }, 10);
        this.setState({
          timeoutId: timeoutId,
          board: this.state.board,
          letterPath: this.state.letterPath
        });
      }
      else {
        clearTimeout(this.state.timeoutId);
        if(this.state.isOver === false){
          this.setState({
            isOver: true,
            result: 'You lose.'
          });
        }
      }
    });
  }

  attemptPath(row: number, col: number, letter: char) {

    var update_url = REQUEST_URL + POST_NEW_GAME + '/' + this.props.gameId + '/attempt';

    var attemptLetterPath = this.state.letterPath + letter

    this.setState({
      board: this.state.board,
      letterPath: attemptLetterPath
    })

    fetch(update_url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.gameId,
        player: this.props.player,
        board: this.state.letterPath
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.result === 'No'){
        this.checkGameExists();
        this.setState({
          board: new Board(),
          letterPath: '',
          timeoutId: this.state.timeoutId
        });
      }
      else if(this.state.letterPath.length === 4) {
        clearTimeout(this.state.timeoutId);
        this.setState({
          isOver: true,
          result: 'You Win!'
        });
        this.setGameOver();
      }
      else {
        this.clickDot(row, col);
        this.checkGameExists();
      }
    });
  }

  setGameOver() {
    fetch(REQUEST_URL + '/games/' + this.props.gameId + '/gameover', {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'}
    }).then((response) => response.json())
    .then((responseData) => {
      console.log('#gameover request response:', responseData);
    }).done();
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
              onPress={this.attemptPath.bind(this, row, col, letterSet.pop())}/>
          )}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          {rows}
        </View>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text style={styles.welcome}>
            {this.props.player}
          </Text>
        </TouchableHighlight>
        <EndGame
          isOver={this.state.isOver}
          result={this.state.result}
          onSwap={this.swap.bind(this)}/>
      </View>
    );
  }

}

module.exports = GameView;
