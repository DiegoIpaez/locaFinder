import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
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

export default function Map() {
  const [startCoords, setStartCoords] = useState(INITIAL_REGION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== SUCCESSFUL_PERMISSION_STATUS) {
          throw new Error(ERROR_MSG.PERMISSIONS.LOCATION.DENIED);
        }
        const { coords } = await Location.getCurrentPositionAsync();
        setStartCoords((prev) => ({
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
        <MapView style={styles.container} initialRegion={startCoords}>
          <Marker coordinate={startCoords} />
        </MapView>
      )}
    </>
  );
}
