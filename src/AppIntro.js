import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import RNBootSplash from 'react-native-bootsplash';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const defaultSlides = [
  {
    key: 'somethun',
    title: 'Quick setup, good defaults',
    text:
      'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
    icon: 'ios-images',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: 'Super customizable',
    text:
      'The component is also super customizable, so you can adapt it to cover your needs and wants.',
    icon: 'ios-options',
    colors: ['#A3A1FF', '#3A3897'],
  },
];

const AppIntro = ({navigation}) => {
  const [slides, setSlides] = useState(defaultSlides);
  const init = async () => {
    console.log('[AppIntro] init...');
    fetch('https://api.upcwangying.com/slides.json')
      .then(response => response.json())
      .then(resJson => {
        console.log('[AppIntro] fetch success: ', resJson);
        resJson && setSlides(resJson);
      })
      .catch(err => console.error('[AppIntro] fetch error: ', err));
  };

  const [initial, setInitial] = useState(false);
  useEffect(() => {
    if (!initial) {
      init().finally(() => {
        RNBootSplash.hide({duration: 250});
      });
      setInitial(true);
    }
  }, [initial]);

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
