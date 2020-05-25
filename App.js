/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';
import CellStrength from './CellStrength';
import {request, PERMISSIONS} from 'react-native-permissions';

const App = () => {
  const [cellStrength, setCellStrength] = useState(0);

  request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => {
    if (result === 'granted') {
      setInterval(() => {
        CellStrength.getCellStrength().then(data => {
          if (data) {
            setCellStrength(data);
          }
        });
      }, 200);
    }
  });

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.content}>
        <View style={styles.readoutContainer}>
          <Text style={styles.readout}>{cellStrength}</Text>
          <Text style={styles.unit}>dBm</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readoutContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  readout: {
    fontSize: 85,
  },
  unit: {
    fontSize: 35,
    marginBottom: 15,
  },
});

export default App;
