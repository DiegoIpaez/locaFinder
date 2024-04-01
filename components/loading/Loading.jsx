import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants';
import styles from './loading.styles';

export default function Loading() {
  return (
    <View>
      <ActivityIndicator animating color={COLORS.primary} size="large" />
      <Text style={styles.text}>Cargando datos...</Text>
    </View>
  );
}
