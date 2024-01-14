import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
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

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    }

    return (
        <View style={styles.container}>
            <Text>
                Trip Page
            </Text>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location ? location.coords.latitude : 0,
                    longitude: location ? location.coords.longitude : 0,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="My Location"
                    />
                )}
            </MapView>

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
        width: '75%',
        height: '50%',
    },
    button: {
        marginTop: 20,
        padding: 10,
    },
    paragraph: {
        marginTop: 10,
    },
});

export { Trip };
