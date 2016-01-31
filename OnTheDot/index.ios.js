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
  render() {
    return (
      <View style={styles.dot}>
      </View>
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
        row[y] = 0;
      }
      grid[y] = row;
    }
    this.grid = grid;
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
      <View>
        <Text>Main page here</Text>
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
      body: JSON.stringify({player1: "Sasha"})
    }).then((response)=> response.json()).then((responseData) => {
    AlertIOS.alert(
        "POST Response",
        "Response Body -> " + JSON.stringify(responseData.body)
    )});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is a board</Text>
        <TouchableHighlight onPress={this.postNewGame, this.swap.bind(this)}>
          <Text>Post your board!</Text>
        </TouchableHighlight>
        <View style={styles.row}>
          <Dot/>
          <Dot/>
        </View>
        <View style={styles.row}>
          <Dot/>
          <Dot/>
        </View>
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
    fontSize: 20,
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
    borderRadius: 60,
    backgroundColor: '#CBA'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('OnTheDot', () => OnTheDot);
