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
var POST_NEW_GAME = '/games'

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
          return {id: game[0], player1: game[1], created_at: game[2]};
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

  goToJoinGame(game) {
    this.props.navigator.replace({
      id: 'JoinGame',
      gameId: game.id
    });
  }

  renderGame(game) {
    return (
      <View>
        <TouchableHighlight onPress={this.goToJoinGame.bind(this, game)}>
          <Text>{game.player1} {game.created_at} {game.id}</Text>
        </TouchableHighlight>
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
          renderRow={this.renderGame.bind(this)}/>
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

module.exports = MainPage;
