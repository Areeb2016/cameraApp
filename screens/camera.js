'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {addImage} from '../redux/actions/image';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

class CameraScreen extends PureComponent {
  constructor(props) {  
    super(props);  
    this.state = {  
        flash: RNCamera.Constants.FlashMode.off,    
    };  
}  
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flash}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
          useNativeZoom={true}
        />

        {/* {this.state.yourVariable === RNCamera.Constants.FlashMode.off && 
        <MCI name='flash-off' color='white' size={40} style={{position:'absolute', top:20, right:20}} onPress={this.setState(flash= RNCamera.Constants.FlashMode.on)}/> 
        }
        {this.state.yourVariable === RNCamera.Constants.FlashMode.on && 
        <MCI name='flash' color='white' size={40} style={{position:'absolute', top:20, right:20}} onPress={this.setState(flash= RNCamera.Constants.FlashMode.off)}/> 
        } */}

        <MCI name={this.state.flash == RNCamera.Constants.FlashMode.off ? 'flash-off' : 'flash'} color='white' size={40} style={{position:'absolute', top:20, right:20}} onPress={this.state.flash == RNCamera.Constants.FlashMode.off ? () => this.setState({flash: RNCamera.Constants.FlashMode.on}) : () => this.setState({flash: RNCamera.Constants.FlashMode.off})}/> 

        <Ionicons name='shirt-outline' color='white' size={200} style={{position:'absolute', top:'22%', left:'25%'}}/> 

        <Text style={{position:'absolute', top:'60%', color:'white', left:'20%', fontSize:20, fontStyle:'bold', }}>Take Picture of the front side</Text>

        <Ionicons name='camera' color='white' size={50} style={{position:'absolute', bottom:20, left:'45%'}} onPress={this.takePicture.bind(this)}/> 
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log('here',data.uri);
      this.props.add(data.uri)
    }
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});