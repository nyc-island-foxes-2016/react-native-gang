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
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 8,
    borderBottomWidth: 8
  },
  clickedDot: {
    backgroundColor: '#44C',
    borderTopColor: '#55D',
    borderLeftColor: '#55D',
    borderRightColor: '#33B',
    borderBottomColor: '#33B'
  },
  unclickedDot: {
    backgroundColor: '#BBC',
    borderTopColor: '#CCD',
    borderLeftColor: '#CCD',
    borderRightColor: '#AAB',
    borderBottomColor: '#AAB'
  },
  winDot: {
    backgroundColor: '#8D4',
    borderTopColor: '#9E5',
    borderLeftColor: '#9E5',
    borderRightColor: '#7C3',
    borderBottomColor: '#7C3'
  },
  loseDot: {
    backgroundColor: '#D52',
    borderTopColor: '#C41',
    borderLeftColor: '#C41',
    borderRightColor: '#E63',
    borderBottomColor: '#E63'
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
  newGame: {
    backgroundColor: '#887766',
    padding: 20,
    borderRadius: 5,
  },
  newGameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AvenirNext-DemiBold',
  }
});

module.exports = styles;
