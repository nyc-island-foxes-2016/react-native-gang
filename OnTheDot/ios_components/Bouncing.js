'use strict'
import React, {
  Animated,
  Component,
  PanResponder,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

class Bouncing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY()
    }
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(
          this.state.pan,
          {toValue:{x: 0, y: 0}}
        ).start();
      }
    });
  }

  render() {
    this.anim = this.anim || new Animated.Value(0);
    return (
      <View style={styles.dragContainer}>
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.dot, styles.dragDot]}>
        </Animated.View>
      </View>
    );
  }
};

module.exports = Bouncing;
