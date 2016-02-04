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

  return (
    <View style= {styles.overlay}>
      <TouchableHighlight
        onPress = {this.instructionDrop.bind(this)}
        underlayColor="white"
        activeOpacity={0.1}>
      <Text style={styles.overlayIntro}>
      <Text style={styles.loadPageText}>{"SPECKLES" + '\n'}</Text>
      {"This game will require quick thumbs, sharp minds and new friends." + '\n\n' + "First, set your board in a secret order." + '\n\n' + "Next, link with nearby friends and solve their speckle order before they solve yours!" + '\n\n\n'}
      <Text style={styles.loadPageX}>{"[X]"}</Text>
      </Text>
      </TouchableHighlight>
    </View>
    );
  }
}

module.exports = StartGameOverlay;
