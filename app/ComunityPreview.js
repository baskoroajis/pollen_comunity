import React, { Component } from 'react'
import { WebView } from 'react-native-webview'


export default class ComunityPreview extends Component {
    render() {
      const userId =  this.props.navigation.getParam('userId', '');
      return (
        <WebView
          source={{uri: 'https://community-staging.pollenstores.co/community/'+userId+'/h'}}
          style={{marginTop: 20}}
        />
      );
    }
  }
