import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';

import {
  useDynamicStyleSheet,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import {whiteColor, blackColor, borderColor} from '../constants/colors';

const ProductCategoryCard = ({count = 9}) => {
  const styles = useDynamicStyleSheet(dynamicStyleSheet);

  const Product = ({title}) => {
    return (
      <View style={styles.productContainer}>
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={{uri: 'https://cdn.upcwangying.com/logo/avatar.JPG'}}
        />
        <Text style={styles.productName}>{title}</Text>
      </View>
    );
  };

  const products = [...Array(count)].map((item, index) => (
    <Product title={index + 1} />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.line} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>小米数字系列</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.productsContainer}>{products}</View>
    </View>
  );
};

const width = Dimensions.get('window').width;
const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  line: {
    height: 1,
    width: 24,
    backgroundColor: new DynamicValue('#f0f0f0', borderColor),
  },
  titleContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: new DynamicValue(blackColor, whiteColor),
  },
  productsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  productContainer: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    paddingVertical: 12,
  },
  image: {
    minHeight: 70,
    minWidth: 70,
    maxHeight: width * 0.2,
    maxWidth: width * 0.2,
    width: width * 0.2,
    height: width * 0.2,
  },
  productName: {
    marginTop: 20,
    color: new DynamicValue(blackColor, whiteColor),
  },
});

export default ProductCategoryCard;
