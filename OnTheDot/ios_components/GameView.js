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

var REQUEST_URL = 'http://localhost:3000';
var POST_NEW_GAME = '/games';

class GameView extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(), letterPath: ''};
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage'
    });
  }

  clickDot(row: number, col: number) {
    if(this.state.board.isClicked(row, col)) {
      return;
    }

    this.setState({
      board: this.state.board.mark(row, col),
      letterPath: this.state.letterPath
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
        this.setState({
          board: new Board(),
          letterPath: ''
        })
      }
      else if(this.state.letterPath.length === 4) {
        this.setState({
          isOver: true,
          result: 'You Win!'
        })
      }
      else {
        this.clickDot(row, col);
      }
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
            onPress={this.attemptPath.bind(this, row, col, letterSet.pop())}/>
        )}
      </View>
    );

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
          />
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
  },
  dot: {
    height: 60,
    width: 60,
    margin: 60,
    borderRadius: 30,
    borderStyle: 'solid',
    borderWidth: 4,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  clickedDot: {
    backgroundColor: '#D43',
    borderColor: '#E54'
  },
  unclickedDot: {
    backgroundColor: '#BBC',
    borderColor: '#CCD'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = GameView;
