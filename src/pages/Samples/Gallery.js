import React, { useState } from 'react'
import {
  Image,
  SafeAreaView, ScrollView,
  StyleSheet, Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

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
const Gallery = ({navigation}) => {
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
          source={require('../../assets/images/add.png')}
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
            <Text style={styles.sectionTitle}>React Native Gallery Demo</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#F3F3F3',
  },
  body: {
    backgroundColor: 'white',
    paddingTop: 24,
  },
  defaultImageWrapper: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#999',
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
  sectionTitle: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
});

export default Gallery
