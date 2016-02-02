'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

class Dot extends Component {
  dotColor() {
    switch(this.props.clicked) {
      case 1:
        return styles.clickedDot;
      case 0:
        return styles.unclickedDot;
      default:
        return {};
    }
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        underlayColor={'transparent'}>
        <View style={[styles.dot, this.dotColor()]}>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = Dot;
