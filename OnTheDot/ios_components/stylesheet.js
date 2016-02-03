'use strict';
import React, {
  StyleSheet
} from 'react-native';

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
  },
  clickedDot: {
    backgroundColor: '#33C',
    borderColor: '#44D'
  },
  unclickedDot: {
    backgroundColor: '#BBC',
    borderColor: '#BBC'
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
    width: 40,
    height: 20,
  }
});

module.exports = styles;
