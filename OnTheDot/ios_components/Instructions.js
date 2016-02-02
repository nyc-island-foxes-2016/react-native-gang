'use strict';

import React, {
  Component,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

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

module.exports = StartGameOverlay;
