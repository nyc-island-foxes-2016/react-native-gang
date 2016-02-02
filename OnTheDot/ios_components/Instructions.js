'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class StartGameOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {atStart: true}

  }

  instructionDrop() {
    this.setState({
      atStart: false
    });
  }


  render () {
    if (this.state.atStart === false) {
      return <View />;
    }

    var instructions = "Play the game!"


  return (
    <View style= {styles.overlay}>
      <TouchableHighlight
        onPress = {this.instructionDrop.bind(this)}
        underlayColor="transparent"
        activeOpacity={0.5}>
      <Text style={styles.overlayMessage}>{instructions}</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

var styles = StyleSheet.create({
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
  },
});

module.exports = StartGameOverlay;
