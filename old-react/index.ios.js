/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');

var {
  AppRegistry,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;
var MultipeerConnectivity = require('react-native-multipeer');

function getStateFromSources() {
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(MultipeerConnectivity.getAllPeers())
    };
}

var AwesomeProject2 = React.createClass({
  getInitialState: function() {
    return getStateFromSources()
  },
  componentDidMount() {
    MultipeerConnectivity.on('peerFound', this._onChange);
    MultipeerConnectivity.on('peerLost', this._onChange);
    MultipeerConnectivity.on('invite', ((event) => {
      // Automatically accept invitations
      MultipeerConnectivity.rsvp(event.invite.id, true);
    }).bind(this));
    MultipeerConnectivity.on('peerConnected', (event) => {
      alert(event.peer.id + ' connected!');
    });
    MultipeerConnectivity.advertise('channel1', { name: 'User-' + Math.round(1e6 * Math.random()) });
    MultipeerConnectivity.browse('channel1');
  },

  renderRow(peer) {
    console.log('this', this);
    console.log('peer', peer);
    return (
      <TouchableHighlight onPress={this._invite.bind(this, peer)} style={styles.row}>
        <View>
          <Text>{peer.name}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return (
      <View style={styles.container}>
        <ListView
          style={styles.peers}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <Text>hi multipeer</Text>
      </View>
    );
  },

  _invite(peer) {
    console.log(peer);
    MultipeerConnectivity.invite(peer.id);
  },

  _onChange() {
    this.setState(getStateFromSources());
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
  },
});


AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);
