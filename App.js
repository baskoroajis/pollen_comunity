'use strict';


import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import  {createStackNavigator, createAppContainer} from 'react-navigation';
import ComunityListPage from './app/ComunityListPage'
import ComunityPreview from './app/ComunityPreview'

const RootStack = createStackNavigator({
  Home : {screen: ComunityListPage,},
  Preview : {screen: ComunityPreview,},

});

const App = createAppContainer(RootStack);
export default App;
