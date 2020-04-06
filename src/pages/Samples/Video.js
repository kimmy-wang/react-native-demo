import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet,
} from 'react-native-dark-mode';
import RNVideo, {FilterType} from 'react-native-video';

import {whiteColor, blackColor} from '../../constants/colors';

const filterTypes = [
  FilterType.NONE,
  FilterType.INVERT,
  FilterType.MONOCHROME,
  FilterType.POSTERIZE,
  FilterType.FALSE,
  FilterType.MAXIMUMCOMPONENT,
  FilterType.MINIMUMCOMPONENT,
  FilterType.CHROME,
  FilterType.FADE,
  FilterType.INSTANT,
  FilterType.MONO,
  FilterType.NOIR,
  FilterType.PROCESS,
  FilterType.TONAL,
  FilterType.TRANSFER,
  FilterType.SEPIA,
];

const Video = () => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [resizeMode, setResizeMode] = useState('contain');
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [controls, setControls] = useState(true);
  const [paused, setPaused] = useState(true);
  const [skin, setSkin] = useState('custom');
  const [ignoreSilentSwitch, setIgnoreSilentSwitch] = useState(null);
  const [isBuffering, setBuffering] = useState(false);
  const [filter, setIsFilter] = useState(FilterType.NONE);
  const [filterEnabled, setFilterEnabled] = useState(true);

  const onLoad = data => {
    console.log('On load fired!');
    setDuration(data.duration);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onBuffer = ({isBuffering}: {isBuffering: boolean}) => {
    setBuffering(isBuffering);
  };

  const getCurrentTimePercentage = () => {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    } else {
      return 0;
    }
  };

  const setFilter = step => {
    let index = filterTypes.indexOf(filter) + step;

    if (index === filterTypes.length) {
      index = 0;
    } else if (index === -1) {
      index = filterTypes.length - 1;
    }

    setIsFilter(filterTypes[index]);
  };

  const renderSkinControl = newSkin => {
    const isSelected = skin === newSkin;
    const selectControls = newSkin === 'native' || newSkin === 'embed';
    return (
      <TouchableOpacity
        onPress={() => {
          setControls(selectControls);
          setSkin(newSkin);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {newSkin}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderRateControl = newRate => {
    const isSelected = rate === newRate;

    return (
      <TouchableOpacity
        onPress={() => {
          setRate(newRate);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {newRate}x
        </Text>
      </TouchableOpacity>
    );
  };

  const renderResizeModeControl = newResizeMode => {
    const isSelected = resizeMode === newResizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          setResizeMode(newResizeMode);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {newResizeMode}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVolumeControl = newVolume => {
    const isSelected = volume === newVolume;

    return (
      <TouchableOpacity
        onPress={() => {
          setVolume(newVolume);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {newVolume * 100}%
        </Text>
      </TouchableOpacity>
    );
  };

  const renderIgnoreSilentSwitchControl = newIgnoreSilentSwitch => {
    const isSelected = ignoreSilentSwitch === newIgnoreSilentSwitch;

    return (
      <TouchableOpacity
        onPress={() => {
          setIgnoreSilentSwitch(newIgnoreSilentSwitch);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {newIgnoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCustomSkin = () => {
    const flexCompleted = getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - getCurrentTimePercentage()) * 100;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => {
            setPaused(!paused);
          }}>
          <RNVideo
            source={{uri: 'https://api.upcwangying.com/video/wuhan.mp4'}}
            style={styles.fullScreen}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            ignoreSilentSwitch={ignoreSilentSwitch}
            resizeMode={resizeMode}
            onLoad={onLoad}
            onBuffer={onBuffer}
            onProgress={onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
            playInBackground={true}
            playWhenInactive={true}
            pictureInPicture={true}
            filter={filter}
            filterEnabled={filterEnabled}
          />
        </TouchableOpacity>

        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {renderSkinControl('custom')}
              {renderSkinControl('native')}
              {renderSkinControl('embed')}
            </View>
            {filterEnabled ? (
              <View style={styles.skinControl}>
                <TouchableOpacity
                  onPress={() => {
                    setFilter(-1);
                  }}>
                  <Text style={styles.controlOption}>Previous Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilter(1);
                  }}>
                  <Text style={styles.controlOption}>Next Filter</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {renderRateControl(0.5)}
              {renderRateControl(1.0)}
              {renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {renderVolumeControl(0.5)}
              {renderVolumeControl(1)}
              {renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {renderResizeModeControl('cover')}
              {renderResizeModeControl('contain')}
              {renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === 'ios' ? (
              <View style={styles.ignoreSilentSwitchControl}>
                {renderIgnoreSilentSwitchControl('ignore')}
                {renderIgnoreSilentSwitchControl('obey')}
              </View>
            ) : null}
          </View>

          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View
                style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
              />
              <View
                style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderNativeSkin = () => {
    const videoStyle =
      skin === 'embed' ? styles.nativeVideoControls : styles.fullScreen;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.fullScreen}>
          <RNVideo
            source={{uri: 'https://api.upcwangying.com/video/wuhan.mp4'}}
            style={videoStyle}
            rate={rate}
            paused={paused}
            volume={volume}
            muted={muted}
            ignoreSilentSwitch={ignoreSilentSwitch}
            resizeMode={resizeMode}
            onLoad={onLoad}
            onBuffer={onBuffer}
            onProgress={onProgress}
            onEnd={() => {
              Alert.alert('Done!');
            }}
            repeat={true}
            playInBackground={true}
            playWhenInactive={true}
            pictureInPicture={true}
            controls={controls}
            filter={filter}
            filterEnabled={filterEnabled}
          />
        </View>
        <View style={styles.controls}>
          <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {renderSkinControl('custom')}
              {renderSkinControl('native')}
              {renderSkinControl('embed')}
            </View>
            {filterEnabled ? (
              <View style={styles.skinControl}>
                <TouchableOpacity
                  onPress={() => {
                    setFilter(-1);
                  }}>
                  <Text style={styles.controlOption}>Previous Filter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setFilter(1);
                  }}>
                  <Text style={styles.controlOption}>Next Filter</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {renderRateControl(0.5)}
              {renderRateControl(1.0)}
              {renderRateControl(2.0)}
            </View>

            <View style={styles.volumeControl}>
              {renderVolumeControl(0.5)}
              {renderVolumeControl(1)}
              {renderVolumeControl(1.5)}
            </View>

            <View style={styles.resizeModeControl}>
              {renderResizeModeControl('cover')}
              {renderResizeModeControl('contain')}
              {renderResizeModeControl('stretch')}
            </View>
          </View>
          <View style={styles.generalControls}>
            {Platform.OS === 'ios' ? (
              <View style={styles.ignoreSilentSwitchControl}>
                {renderIgnoreSilentSwitchControl('ignore')}
                {renderIgnoreSilentSwitchControl('obey')}
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return <>{controls ? renderNativeSkin() : renderCustomSkin()}</>;
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
    marginBottom: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
});

export default Video;
