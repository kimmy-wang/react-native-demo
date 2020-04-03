import React from 'react';
import {View, Text, Image} from 'react-native';

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
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  image: {
    width: 70,
    height: 70,
  },
  productName: {
    marginTop: 20,
    color: new DynamicValue(blackColor, whiteColor),
  },
});

export default ProductCategoryCard;
