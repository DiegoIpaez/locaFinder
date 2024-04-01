import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import styles from './map.styles';
import carIcon from '@/assets/car.png';
import Loading from '../loading/Loading';
import catchError from '@/utilities/catchError.utility';
import {
  ERROR_MSG,
  SUCCESSFUL_PERMISSION_STATUS,
  API_KEYS,
  COLORS,
} from '@/constants';

const INITIAL_REGION = {
  latitude: -26.789837,
  latitudeDelta: 0.04,
  longitude: -65.220425,
  longitudeDelta: 0.9,
};

const DEFAULT_DESTINATION = {
  ...INITIAL_REGION,
  latitude: 33.753746,
  longitude: -84.38633,
};

export default function Map() {
  const [isLoading, setIsLoading] = useState(true);
  const [startCoordinates, setStartCoordinates] = useState(INITIAL_REGION);
  const [destinationCoordinates, setDestinationCoordinates] =
    useState(DEFAULT_DESTINATION);

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== SUCCESSFUL_PERMISSION_STATUS) {
          throw new Error(ERROR_MSG.PERMISSIONS.LOCATION.DENIED);
        }
        const { coords } = await Location.getCurrentPositionAsync();
        setStartCoordinates((prev) => ({
          ...prev,
          latitude: coords?.latitude,
          longitude: coords.longitude,
          longitudeDelta: 120,
        }));
      } catch (error) {
        catchError(error, ERROR_MSG.PERMISSIONS.LOCATION.DEFAULT);
      } finally {
        setIsLoading(false);
      }
    };
    getLocationPermission();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MapView style={styles.container} initialRegion={startCoordinates}>
          <Marker
            image={carIcon}
            coordinate={startCoordinates}
            draggable
            onDragEnd={({ nativeEvent }) =>
              setStartCoordinates(nativeEvent?.coordinate)
            }
          />
          <Marker
            coordinate={destinationCoordinates}
            draggable
            onDragEnd={({ nativeEvent }) =>
              setDestinationCoordinates(nativeEvent?.coordinate)
            }
          />
          {API_KEYS.GOOGLE_MAPS ? (
            <MapViewDirections
              origin={startCoordinates}
              destination={destinationCoordinates}
              apikey={API_KEYS.GOOGLE_MAPS}
              strokeColor={COLORS.dark}
              strokeWidth={5}
            />
          ) : (
            <Polyline
              coordinates={[startCoordinates, destinationCoordinates]}
              strokeColor={COLORS.primary}
              strokeWidth={5}
            />
          )}
        </MapView>
      )}
    </>
  );
}
