import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {fetchAppIntroSlides} from './store/action-creators';

const AppIntro = ({navigation}) => {
  const dispatch = useDispatch();
  const slides = useSelector(state => state.slides);
  const slidesLoading = useSelector(state => state.slidesLoading);
  if (!slidesLoading) {
    RNBootSplash.hide({duration: 250});
  }

  useEffect(() => {
    dispatch(fetchAppIntroSlides());
  }, []);

  const _renderItem = ({item, dimensions}) => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          flex: 1,
          paddingTop: item.topSpacer,
          paddingBottom: item.bottomSpacer,
          width: dimensions.width,
        },
      ]}
      colors={item.colors}
      start={{x: 0, y: 0.1}}
      end={{x: 0.1, y: 1}}>
      <Ionicons
        style={{backgroundColor: 'transparent'}}
        name={item.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </LinearGradient>
  );

  const _onDone = () => {
    navigation && navigation.replace('BottomTabNavigator');
  };
  return (
    <AppIntroSlider
      slides={slides}
      renderItem={_renderItem}
      // bottomButton
      showPrevButton
      showSkipButton
      // hideNextButton
      // hideDoneButton
      onDone={_onDone}
      onSkip={_onDone}
    />
  );
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default AppIntro;
