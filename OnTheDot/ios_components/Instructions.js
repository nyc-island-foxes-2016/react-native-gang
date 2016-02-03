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

    var instructions = "Each board consists of a grid of dots. Select dots to form your board pattern. Find nearby opponents and race to guess their pattern."


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
