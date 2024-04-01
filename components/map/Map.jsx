import { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

import styles from './map.styles';
import Loading from '../loading/Loading';
import { ERROR_MSG, SUCCESSFUL_PERMISSION_STATUS } from '@/constants';
import catchError from '@/utilities/catchError.utility';

const INITIAL_REGION = {
  latitude: -26.789837,
  latitudeDelta: 0.04,
  longitude: -65.220425,
  longitudeDelta: 0.9,
};

const DESTINATION = {
  ...INITIAL_REGION,
  latitude: 33.753746,
  longitude: -84.38633,
};

export default function Map() {
  const [startCoordinates, setStartCoordinates] = useState(INITIAL_REGION);
  const [destinationCoordinates, setDestinationCoordinates] =
    useState(DESTINATION);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) return <Loading />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MapView style={styles.container} initialRegion={startCoordinates}>
          <Marker
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
          <Polyline
            coordinates={[startCoordinates, destinationCoordinates]}
            strokeColor="blue"
            strokeWidth={5}
          />
        </MapView>
      )}
    </>
  );
}
