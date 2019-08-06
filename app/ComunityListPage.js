'use strict';

import React, {Component} from 'react';
import { Button,SocialIcon } from 'react-native-elements';
import {StyleSheet, TouchableHighlight,Text, TextInput, View, ActivityIndicator, Image,  FlatList,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './Reducer'
import PollenSaga from './PollenSaga'
import * as dataActions from './PollenAction'
import * as api from './PollenApi'

type Props = {};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export default class ComunityListPage extends Component<Props>{
	static navigationOptions = {
		title : "Pollen"
	};
	constructor(props){
		super(props);
		this.state = {
			isLoading : false,
			communities : [],
			
		};
	}
	

	async componentDidMount(){
		this._subscribe();
		api;
	}
	  
	_subscribe = () =>{
		const sagaMiddleware = createSagaMiddleware()
		const store = createStore(reducer,applyMiddleware(sagaMiddleware))
		
		sagaMiddleware.run(PollenSaga)
		store.subscribe(() => {
			try {
				var state = store.getState();
				this.setState({isLoading : state.data.loading});
				if (this.state.isLoading == false){
					if (state.data.data.communities != null){
						this.setState({communities :state.data.data.communities});
					}
				}
			
			} catch (error) {
				
			}
		 })
		 store.dispatch(dataActions.showLoading())
	}

	 _changeToPreviewPage = (userId) => {
		this.props.navigation.navigate(
			'Preview', {userId: userId});
	 }

	_renderItem = ({item}) => {
		return (
		<TouchableOpacity
		   key = {item.id}
		   style = {styles.container}
		   
		 	>
			<View>
				<View style={styles.flowRight}>
					<Avatar  
						rounded
						activeOpacity={0.7}
						size="large"
						renderPlaceholderContent={<Image style={styles.imagePlaceholder} source={require('./resources/user_placeholder.png') } />}
						source={{ uri:item.photo,}}
						containerStyle={styles.imageThumbnail }
						></Avatar>
					<View style={styles.rightcellContainer}>
						<Text style = {styles.comunityNameText}>{capitalizeFirstLetter(item.name)}</Text>
						<Text style = {styles.comunityCreatorText}>{capitalizeFirstLetter(item.creatorName) + ' - '+capitalizeFirstLetter('Has ' +item.sellers.length+' Seller ')}</Text>
						<Button type='clear' style = {styles.buttonPreview}  title="Preview" onPress = {() => this._changeToPreviewPage(item._id)}></Button>
					</View>
					
				</View>
				<View style={styles.lineSeparator}></View>
			</View>		
		 
		</TouchableOpacity>
		);
	};
	
	render(){
		const spinner = this.state.isLoading ? <ActivityIndicator style={styles.loadingIndicator} size='large' /> : null;
        const { params } = this.props.navigation.state;

		return(
			<View style={styles.container}>
			<FlatList 
				//set default sorting by seller size
				data={this.state.communities.sort((a, b) => b.sellers.length - a.sellers.length)}
				renderItem={this._renderItem}
			/>
			{spinner}
			</View>
		
			);
	}
}





const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
	color:'#000000',
	alignItems: 'stretch',
	paddingTop : 5,
	paddingBottom : 5
  },
  imagePlaceholder:{
	width : 85,
	height : 85,
	
  },
  imageThumbnail: {
	 marginLeft : 30,
	 marginTop : 10,
	 marginBottom : 10,
	 alignSelf : 'center'
  },

  flowRight: {
  	flexDirection: 'row',
  	alignItems: 'flex-start',
	alignSelf: 'stretch',
  },
  
  rightcellContainer:{
	  flexGrow : 1,
  },

  comunityNameText : {
	 alignSelf : 'center',
	 fontSize : 20,
	 marginTop : 5,
	 color : '#5b2a91',
	
  },
  comunityCreatorText : {
	alignSelf : 'center',
	marginTop : 5,
	fontSize : 14,
	color : '#757472',
  },
  numberSellerText : {
	marginLeft : 22,
	fontSize : 13,
	marginTop : 10,
	color : '#4d4c4c',
  },
  itemText : {
	fontSize : 15,
	marginLeft : 10,
	  color : '#c7c4c1',
  },
  lineSeparator : {
	  marginTop : 10,
	  height : 3,
	  backgroundColor : '#d2bceb'
  },
  buttonPreview : {
	color : '#000000',
	fontSize : 20,
  },

  loadingIndicator : {
	  alignSelf : 'center',
	  marginTop : 150
  },
  image: {
  	width: 217,
  	height:138,
  },

})