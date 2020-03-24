import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  useDarkMode,
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';

import productCategories from '../../constants/product-category';

const ProductCategory = () => {
  const isDarkMode = useDarkMode();
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const onCategoryItemClick = index => {
    console.log('index', index);
    setCurrentCategoryIndex(index);
    categoriesRef &&
      categoriesRef.current.scrollToIndex({
        index: index,
        viewOffset: 100,
      });
    productsRef &&
      productsRef.current.scrollToIndex({
        index: 0,
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onCategoryItemClick(index)}>
        <View
          style={[
            styles.categoryItem,
            currentCategoryIndex === index
              ? {
                  borderLeftWidth: 3,
                  borderLeftColor: 'orange',
                }
              : {},
          ]}>
          <Text
            style={[
              styles.categoryItemContent,
              currentCategoryIndex === index
                ? {
                    color: 'orange',
                  }
                : {
                    color: isDarkMode ? 'white' : 'black',
                  },
            ]}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem2 = ({item, index}) => {
    return (
      <TouchableOpacity>
        <View style={[styles.categoryItem]}>
          <Text
            style={[
              styles.categoryItemContent,
              {color: isDarkMode ? 'white' : 'black'},
            ]}>
            {item.label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onProductsEndReached = ({distanceFromEnd}) => {
    console.log(distanceFromEnd);
    // currentCategoryIndex < productCategories.length - 1 &&
    //   onCategoryItemClick(currentCategoryIndex + 1);
  };

  const products = [...Array(20 + currentCategoryIndex)].map((d, index) => ({
    id: index + 1, // For example only -- don't use index as your key!
    label: `category ${currentCategoryIndex}, Product ${index + 1}`,
  }));

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <FlatList
            ref={categoriesRef}
            initialScrollIndex={0}
            showsVerticalScrollIndicator={false}
            data={productCategories}
            renderItem={renderItem}
          />
        </View>
        <View style={styles.rightContainer}>
          <FlatList
            ref={productsRef}
            initialScrollIndex={0}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            data={products}
            renderItem={renderItem2}
            onEndReached={onProductsEndReached}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryContainer: {
    width: 120,
    backgroundColor: new DynamicValue('white', 'black'),
    borderRightWidth: 1,
    borderRightColor: new DynamicValue('#f0f0f0', '#555'),
  },
  categoryItem: {
    height: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItemContent: {
    fontSize: 16,
  },
  rightContainer: {
    flex: 1,
    backgroundColor: new DynamicValue('white', 'black'),
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});

export default ProductCategory;
