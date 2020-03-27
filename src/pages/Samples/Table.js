import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  useDarkModeContext,
  DynamicStyleSheet,
  DynamicValue,
} from 'react-native-dark-mode';
import {
  Table,
  Row,
  TableWrapper,
  Col,
  Rows,
} from 'react-native-table-component';

import {whiteColor, blackColor} from '../../constants/colors';

const TablePage = () => {
  const mode = useDarkModeContext();
  const styles = dynamicStyleSheet[mode];

  const tableHead = [
    '',
    'Head',
    'Head2',
    'Head3',
    'Head4',
    'Head5',
    'Head6',
    'Head7',
    'Head8',
    'Head9',
  ];
  const widthArr = [60, 60, 60, 80, 100, 120, 140, 160, 180, 200];

  const tableData = [],
    tableTitle = [],
    colHeight = [];
  for (let i = 0; i < 30; i++) {
    const rowData = [];
    for (let j = 0; j < 9; j++) {
      rowData.push(`${i}${j}`);
    }
    tableTitle.push(`Title${i + 1}`);
    colHeight.push(40);
    tableData.push(rowData);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <TableWrapper style={styles.wrapper}>
              <Col
                data={tableTitle}
                style={styles.col}
                width={60}
                heightArr={colHeight}
                textStyle={styles.text}
              />
              <Rows
                data={tableData}
                widthArr={widthArr.slice(1)}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const dynamicStyleSheet = new DynamicStyleSheet({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 10,
    backgroundColor: new DynamicValue(whiteColor, blackColor),
  },
  header: {
    height: 50,
    backgroundColor: '#537791',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
  },
  wrapper: {
    flexDirection: 'row',
  },
  dataWrapper: {
    marginTop: -1,
  },
  col: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
  },
});

export default TablePage;
