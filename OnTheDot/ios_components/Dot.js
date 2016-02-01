'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

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
  },
  clickedDot: {
    backgroundColor: '#DA8',
    borderColor: '#642',
    borderStyle: 'solid',
    borderWidth: 4
  },
  unclickedDot: {
    backgroundColor: '#ABC',
    borderColor: '#456',
    borderStyle: 'solid',
    borderWidth: 4
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Dot;
