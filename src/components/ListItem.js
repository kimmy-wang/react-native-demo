import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ListItem = ({ title, description, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={
        styles.item
      }
    >
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 10,
  },
  sectionContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
});

export default ListItem;
