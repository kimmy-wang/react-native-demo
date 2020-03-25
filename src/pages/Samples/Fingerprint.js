import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  Button,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import Modal from 'react-native-modal';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import ShakingText from '../../components/ShakingText';

const Fingerprint = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const [visible, setVisible] = useState(false);
  const [errorMessageLegacy, setErrorMessageLegacy] = useState(undefined);
  const [biometricLegacy, setBiometricLegacy] = useState(undefined);

  const onPress = () => {
    console.log(Platform.OS);
    if (Platform.OS === 'ios') {
      FingerprintScanner.authenticate({
        description: 'Scan your fingerprint on the device scanner to continue',
      })
        .then(() => {
          Alert.alert('Authenticated successfully');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else if (Platform.OS === 'android') {
      if (requiresLegacyAuthentication()) {
        setVisible(true);
        authLegacy();
      } else {
        authCurrent();
      }
    } else {
      console.log('Platform Not Supported.');
    }
  };

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = () => {
    FingerprintScanner.authenticate({
      description: 'Log in with Biometrics',
    })
      .then(() => {
        // todo
        Alert.alert('Biometrics Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        // todo
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        setErrorMessageLegacy(error.message);
        setBiometricLegacy(error.biometric);
        this.description && this.description.shake();
      });
  };

  const handleAuthenticationAttemptedLegacy = error => {
    setErrorMessageLegacy(error.message);
    this.description && this.description.shake();
  };

  const style = {};
  const handlePopupDismissedLegacy = () => {
    console.log('handlePopupDismissedLegacy');
  };

  return (
    <View style={styles.container}>
      <Button title="生物认证" onPress={onPress} />
      <Modal isVisible={visible}>
        <View style={styles.legacyContainer}>
          <View style={[styles.contentContainer, style]}>
            <Image
              style={styles.logo}
              source={require('../../assets/images/finger_print.png')}
            />

            <Text style={styles.heading}>Biometric{'\n'}Authentication</Text>
            <ShakingText
              ref={instance => {
                this.description = instance;
              }}
              style={[
                styles.description,
                {color: errorMessageLegacy ? '#ea3d13' : '#a5a5a5'},
              ]}>
              {errorMessageLegacy ||
                `Scan your ${biometricLegacy} on the\ndevice scanner to continue`}
            </ShakingText>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handlePopupDismissedLegacy}>
              <Text style={styles.buttonText}>BACK TO MAIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
  },
  legacyContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 164, 222, 0.9)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicValue('white', 'black'),
  },
  logo: {
    marginVertical: 45,
  },
  heading: {
    textAlign: 'center',
    color: '#00a4de',
    fontSize: 21,
  },
  description: {
    textAlign: 'center',
    height: 65,
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  buttonText: {
    color: '#8fbc5a',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Fingerprint;
