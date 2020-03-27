import React, {useState} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import ImagePicker from 'react-native-image-picker';

import {whiteColor, blackColor, borderColor} from '../../constants/colors';

//图片选择器参数设置
const options = {
  title: '请选择图片来源',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '相册图片',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const lightModeLogo = require('../../assets/images/add.png');
const darkModeLogo = require('../../assets/images/add_dark.png');
const modeUri = new DynamicValue(lightModeLogo, darkModeLogo);

const Gallery = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const modeSource = modeUri[mode];
  const [imageUrl, setImageUrl] = useState('');

  const choosePic = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled.');
      } else if (response.error) {
        console.error('ImagePicker Error：' + response.error);
      } else {
        // let source = {uri: response.uri};
        // let source = {uri: 'data:image/jpeg;base64,' + response.data};
        const {uri} = response;
        setImageUrl(uri);
      }
    });
  };

  const headerContent = !imageUrl ? (
    <TouchableWithoutFeedback onPress={choosePic}>
      <View style={styles.defaultImageWrapper}>
        <Image
          resizeMode="contain"
          source={modeSource}
          style={styles.defaultImage}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback onPress={choosePic}>
      <View style={styles.imageWrapper}>
        <Image
          resizeMode="contain"
          source={{uri: imageUrl}}
          style={styles.image}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View>{headerContent}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  scrollView: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  body: {
    backgroundColor: new DynamicValue(whiteColor, blackColor),
    paddingVertical: 24,
  },
  defaultImageWrapper: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: borderColor,
    borderRadius: 4,
  },
  defaultImage: {
    width: 80,
    height: 80,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Gallery;
