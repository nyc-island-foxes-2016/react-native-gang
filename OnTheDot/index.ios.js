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
  Spinner,
  View
} from 'react-native';
import Board from './ios_components/Board';
import BoardEntry from './ios_components/BoardEntry';
import Dot from './ios_components/Dot';
import GameView from './ios_components/GameView';
import Instructions from './ios_components/Instructions';
import JoinGame from './ios_components/JoinGame';
import LoadPage from './ios_components/LoadPage';
import MainPage from './ios_components/MainPage';
import MultipeerConnectivity from 'MultipeerConnectivity';
import WaitingPage from './ios_components/WaitingPage';
import styles from './ios_components/stylesheet';

var REQUEST_URL = 'http://localhost:3000'
var POST_NEW_GAME = '/games'

class OnTheDot extends Component {

  constructor(){
    super();
  }

  componentDidMount() {
    MultipeerConnectivity.on('peerFound', this._onChange);
    MultipeerConnectivity.on('peerLost', this._onChange);
    MultipeerConnectivity.on('invite', ((event) => {
      MultipeerConnectivity.rsvp(event.invite.id, true);
    }).bind(this));
    MultipeerConnectivity.on('peerConnected', (event) => {
      alert(event.peer.id + ' connected!');
    });
    MultipeerConnectivity.advertise('channel1', {name: 'User-' + Math.round(Math.random() * 1e6)};
    MultipeerConnectivity.browse('channel1');
  }

  getRandomPeer() {
    var allPeers = MultipeerConnectivity.getAllPeers();
    if(allPeers) {
      randIndex = Math.floor(Math.random * allPeers.length);
      return allPeers[randIndex];
    }
    return null;
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    var gameId = route.gameId;
    var player = route.player;
    var atStart = route.atStart
    // have a state here set to true

    if(routeId === 'LoadPage') {
      return (
        <LoadPage navigator={navigator}/>
      );
    }
    else if(routeId === 'MainPage') {
      return (
        <MainPage navigator={navigator}
          atStart = {atStart}
          randPeer = {this.getRandomPeer()}/>
      );
    }
    else if(routeId === 'BoardEntry') {
      return (
        <BoardEntry navigator={navigator}/>
      );
    }
    else if(routeId === 'JoinGame') {
      return(
        <JoinGame
          navigator={navigator}
          gameId={gameId}/>
      );
    }
    else if(routeId === 'WaitingPage'){
      return (
        <WaitingPage
        navigator={navigator}
        gameId = {gameId}
        player = {player}/>
        );
    }
    else if(routeId === 'GameView') {
      return (
        <GameView
          navigator={navigator}
          gameId={gameId}
          player={player}/>
      );
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 'LoadPage', name: 'Index'}}
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

AppRegistry.registerComponent('OnTheDot', () => OnTheDot);
