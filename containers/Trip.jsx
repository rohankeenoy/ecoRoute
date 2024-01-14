import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const Trip = () => {
    const [tripStatus, setTripStatus] = useState("Start Trip");
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleTripToggle = () => {
        setTripStatus((prevStatus) => (prevStatus === "Start Trip" ? "End Trip" : "Start Trip"));
    };

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
      }
    


    return (
        <View style={styles.container}>
            <Text>
                Trip Page
            </Text>

            <MapView style={styles.map} />
            
            <Button style={styles.button} mode="contained" onPress={handleTripToggle}>
                {tripStatus}
            </Button>
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '50%',
        height: '50%',
    },
    button: {
        marginTop: 20,
        padding: 10,
    },
});

export { Trip };
