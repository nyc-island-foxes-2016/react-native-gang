'use strict';
import React, {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b3e8e1',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    padding: 10,
    color: 'white',
    borderStyle: 'solid',
    borderColor: '#a1a1af'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  dot: {
    height: 30,
    width: 30,
    margin: 30,
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  clickedDot: {
    backgroundColor: '#D40145',
    borderColor: '#D40145'
  },
  unclickedDot: {
    backgroundColor: '#FFF',
    borderColor: '#FFF'
  },
  winDot: {
    backgroundColor: '#3C3',
    borderColor: '#4D4'
  },
  loseDot: {
    backgroundColor: '#C33',
    borderColor: '#D44'
  },
  dragContainer: {
    position: 'absolute',
    top: 0,
    left: -90
  },
  dragDot: {
    backgroundColor: '#3CC',
    borderColor: '#4DD'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
    overlay: {
    backgroundColor: '#887766',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(221, 221, 221, 0.5)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayMessage: {
    fontSize: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
  },
    overlayIntro: {
    fontSize: 40,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
    backgroundColor:'#81D9CD',
    overflow: 'hidden',
    borderColor: '#81D9CD',
    borderRadius: 30,
    borderWidth: 0.5,
    height: 400,
    width: 300,
  },
  newGame: {
    backgroundColor: '#887766',
    padding: 20,
    borderRadius: 5,
  },
  newGameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirNext-DemiBold',
  },
  loadPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: 40,
    backgroundColor:'#3AA1BF'
  },
  loadPageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20
  },
  boardButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    width: 120,
    height: 25,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
    top: 100
  },
  boardInstructions: {
    bottom: 80,
    color: '#2e2e32',
    fontStyle: 'italic',
    textAlign: 'center',
    justifyContent: 'center'
  }
});

module.exports = styles;
