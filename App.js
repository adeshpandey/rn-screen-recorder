/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Button,
  PermissionsAndroid, Platform
} from 'react-native';
import ReactNativeRecordScreen from 'react-native-record-screen';
import Video from 'react-native-video';


const App: () => React$Node = () => {

  hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  toggleRecord = async () => {

    try{
    if (state.title == 'Start') {
      if (Platform.OS == 'android') {
        const isPermitted = await hasAndroidPermission()
        if (isPermitted) {
          await ReactNativeRecordScreen.startRecording({ mic: true }).then(res => console.log(res)).catch(err => console.log(err))
          setstate({ title: 'Stop', bg: 'red' })
        }
      }
      else {
        await ReactNativeRecordScreen.startRecording({ mic: true }).then(res => console.log(res)).catch(err => console.log(err))
        setstate({ title: 'Stop', bg: 'red' })
      }
    }
    else {
      const res = await ReactNativeRecordScreen.stopRecording().catch(err => console.log(err))
      if(res){
        setstate({ title: 'Start', bg: 'green', uri: res.result.outputURL })
        console.log(res)  
      }

    }
  }
  catch(error){
    alert(JSON.stringify(error))
  }

  }

  const [state, setstate] = useState({ title: "Start", bg: "green", uri: false })
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {state.uri && <Text>{state.uri}</Text>}
      {state.uri && <Video style={{ width: 300, height: 300 }} source={{ uri: state.uri }} />}

      <Button title={state.title} color={state.bg} onPress={toggleRecord} />
    </View>
  );
};

export default App;
