'use strict'
import React, {
  Animated,
  Easing,
  Component,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './stylesheet';

class Bouncing extends Component {
  render() {
    this.anim = this.anim || new Animated.Value(0);
    return (
      <View>
        <View
          onPress={() => {
            Animated.spring(this.anim, {
              toValue: 0,
              velocity: 3,
              tension: -10,
              friction: 1
            }).start();
          }}>
        </View>
        <Animated.View
          style={[styles.dot,
            styles.clickedDot,
            {
              transform: [
                {scale: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 4]
                  })
                },
                {translateX: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 500]
                  })
                },
                {rotate: this.anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg']
                  })
                }
              ]
            }
          ]}>
        </Animated.View>
      </View>
    );
  }
}

module.exports = Bouncing;
