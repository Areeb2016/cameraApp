import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux';
import {addImage} from '../redux/actions/image';

function HomeScreen(props) {
  return (
    <View style={{ flex: 1}}>
      <FlatList style={{marginTop:2}}
                    data = {props.images}
                    keyExtractor={(item, index) => index.toString()}
                    // horizontal={true}
                    renderItem = {({item, index}) => {
                    return(
                    <View>
                        <Image source={{uri: item.name}} style={{width: 200, height: 200, resizeMode:'stretch', marginTop:5}}/>
                    </View>
                    )}}
                />

      <Ionicons name='camera' size={40} style={{position:'absolute', bottom:20, right:20}} onPress={() => props.navigation.navigate('Camera')}/> 
    </View>
  );
}

const mapStateToProps = (state) => {
  return{
      images: state.imageReducer.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      add: (image) => dispatch(addImage(image))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)