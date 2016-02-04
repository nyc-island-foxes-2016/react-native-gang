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
    backgroundColor: '#D40145',
    borderColor: '#D40145'
  },
  loseDot: {
    backgroundColor: '#D40145',
    borderColor: '#D40145'
  },
  dragContainer: {
    position: 'absolute',
    top: -70,
    left: 50,
    backgroundColor: 'transparent'
  },
  dragDot: {
    backgroundColor: '#3CC',
    borderColor: '#3CC'
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
    fontSize: 14,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#81D9CD',
    overflow: 'hidden',
    borderColor: '#81D9CD',
    borderRadius: 30,
    borderWidth: 0.5,
    height: 300,
    width: 280,
    opacity: 0.8,
    padding: 15
  },
  overlayEndGame: {
    fontSize: 50,
    bottom: 100,
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
    overflow: 'hidden',
    color: '#000'
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
    backgroundColor:'#3AA1BF'
  },
  loadPageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Futura',
    padding: 10,
  },
  loadPageX: {
    color: 'white',
    fontWeight: 'bold'
  },
  tops: {
    top: 180
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 20
  },
  ditchPageText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-DemiBold',
    padding: 10,
  },
  ditchButton: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    justifyContent: 'center',
    width: 200,
    height: 50,
    backgroundColor: 'transparent',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    paddingTop: 15,
    paddingBottom: 10,
    top: 40
  },
  boardButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 5,
    textAlign: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 20,
    top: 100
  },
  boardInstructions: {
    bottom: 30,
    color: '#73737d',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'AvenirNext-DemiBold',
    textAlign: 'center',
    justifyContent: 'center'
  }
});

module.exports = styles;
