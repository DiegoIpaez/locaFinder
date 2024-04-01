export * from './messages.constant';

const SUCCESSFUL_PERMISSION_STATUS = 'granted';

const API_KEYS = {
  GOOGLE_MAPS: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
};

export { SUCCESSFUL_PERMISSION_STATUS, API_KEYS };
