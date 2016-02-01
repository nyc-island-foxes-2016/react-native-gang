/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class Dot extends Component {
  dotColor() {
    switch(this.props.clicked) {
      case 1:
        return styles.clickedDot;
      case 0:
        return styles.unclickedDot;
      default:
        return {};
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={'transparent'}>
        <View style={[styles.dot, this.dotColor()]}>
        </View>
      </TouchableHighlight>
    );
  }
}

class Board {
  grid: Array<Array<number>>;

  constructor() {
    var size = 2;
    var grid = Array(size);
    for (var y = 0; y < size; y++) {
      var row = Array(size);
      for (var x = 0; x < size; x++) {
        row[x] = {clicked: 0};
      }
      grid[y] = row;
    }
    this.grid = grid;
  }

  mark(row: number, col: number): Board {
    this.grid[row][col] = 1;
    return this;
  }

  isClicked(row, col) {
    return this.grid[row][col] === 1;
  }
}

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        loaded: false
      })
    };
  }

  componentDidMount() {
    this.getWaitingGames();
  }

  getWaitingGames() {
    fetch(REQUEST_URL + '/games/waiting')
      .then((response) => response.json())
      .then((responseData) => {
        var gameObjects = responseData.map(function(game) {
          return {player1: game[0], created_at: game[1]};
        })
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(gameObjects),
          loaded: true
        });
      }).done();
  }

  swap() {
    this.props.navigator.replace({
      id: 'BoardEntry'
    });
  }

  renderGame(game) {
    return (
      <View>
        <Text>{game.player1}</Text>
      </View>
    );
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Main page here
          </Text>
        <TouchableHighlight onPress={this.swap.bind(this)}>
          <Text>Goto Board</Text>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderGame}/>
      </View>
    );
  }
}

class BoardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {board: new Board(), letterPath: ''};
  }

  swap() {
    this.props.navigator.replace({
      id: 'MainPage'
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
          board: null
        })
      })
    .then((response) => response.json())
    .then((responseData) => {
      this.swap();
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
        {dots.map((dotVal, col) =>
          <Dot
            key={col}
            clicked={dotVal.clicked}
            onPress={this.handleDotClick.bind(this, row, col, letterSet.pop())}/>
        )}
      </View>
    );

    return (
      <View style={styles.container}>
        <View>
          {rows}
        </View>
        <TouchableHighlight onPress={this.postNewGame.bind(this)}>
          <Text style={styles.welcome}>
            Post your board!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

class OnTheDot extends Component {

  renderScene(route, navigator) {
    var routeId = route.id;
    if(routeId === 'MainPage') {
      return (
        <MainPage navigator={navigator}/>
      );
    }
    else if(routeId === 'BoardEntry') {
      return (
        <BoardEntry navigator={navigator}/>
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'MainPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if(route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.VerticalDownSwipeJump;
        }
      }/>
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
  },
  clickedDot: {
    backgroundColor: '#DA8',
    borderColor: '#642',
    borderStyle: 'solid',
    borderWidth: 4
  },
  unclickedDot: {
    backgroundColor: '#ABC',
    borderColor: '#456',
    borderStyle: 'solid',
    borderWidth: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('OnTheDot', () => OnTheDot);
