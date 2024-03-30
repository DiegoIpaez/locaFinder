import { Alert } from 'react-native';
import { ERROR_MSG } from '@/constants';

/**
 * Method for catching errors and displaying alert messages in a React Native application.
 * If the error provides a message, that message will be shown in the alert.
 * If no error message is available, a default message will be shown.
 *
 * @param {Error} error - The error object that was caught.
 * @param {string} [defaultMsg='General error'] - The default alert message if no error message is provided.
 * @returns {void} There is no explicit return value, as it displays an alert.
 */
const catchError = (error, defaultMsg = ERROR_MSG.GENERAL) => {
  const message = error?.message ? error?.message : defaultMsg;
  Alert.alert(message);
};

export default catchError;
