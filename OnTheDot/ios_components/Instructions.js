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
    this.state = {atStart: this.props.atStart}

  }

  instructionDrop() {
    this.setState({
      atStart: false
    });
  }

  swap() {
      this.props.navigator.replace({
        id: 'MainPage',
        atStart: true
      });
  }

  render () {
    if (this.state.atStart === false) {
      return <View />;
    }

    var instructions = "TODO write the instructions"


  return (
    <View style= {styles.overlay}>
      <TouchableHighlight
        onPress = {this.instructionDrop.bind(this)}
        underlayColor="white"
        activeOpacity={0.3}>
      <Text style={styles.overlayIntro}>{instructions}</Text>
      </TouchableHighlight>
    </View>
    );
  }
}

module.exports = StartGameOverlay;
