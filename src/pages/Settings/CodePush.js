import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import CodePush from 'react-native-code-push';

const codePushOptions = {checkFrequency: CodePush.CheckFrequency.MANUAL};

let CCodePush = () => {
  const [restartAllowed, setRestartAllowed] = useState(true);
  const [progress, setProgress] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  const codePushStatusDidChange = syncStatus => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setSyncMessage('Checking for update.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setSyncMessage('Downloading package.');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setSyncMessage('Awaiting user action.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setSyncMessage('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setSyncMessage('App up to date.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setSyncMessage('Update cancelled by user.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setSyncMessage('Update installed and will be applied on restart.');
        setProgress(false);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setSyncMessage('An unknown error occurred.');
        setProgress(false);
        break;
    }
  };

  const codePushDownloadDidProgress = progressing => {
    setProgress(progressing);
  };

  const toggleAllowRestart = () => {
    restartAllowed ? CodePush.disallowRestart() : CodePush.allowRestart();

    setRestartAllowed(!restartAllowed);
  };

  const getUpdateMetadata = () => {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      (metadata: LocalPackage) => {
        setSyncMessage(
          `Error: ${
            metadata ? JSON.stringify(metadata) : 'Running binary version'
          }`,
        );
        setProgress(false);
      },
      (error: any) => {
        setSyncMessage(`Error: ${error}`);
        setProgress(false);
      },
    );
  };

  /** Update is downloaded silently, and applied on restart (recommended) */
  const sync = () => {
    CodePush.sync({}, codePushStatusDidChange, codePushDownloadDidProgress);
  };

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  const syncImmediate = () => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true},
      codePushStatusDidChange,
      codePushDownloadDidProgress,
    );
  };

  const progressView = () => {
    return progress ? (
      <Text style={styles.messages}>
        {progress.receivedBytes} of {progress.totalBytes} bytes received
      </Text>
    ) : null;
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome to CodePush!</Text>
            <TouchableOpacity onPress={sync}>
              <Text style={styles.syncButton}>Press for background sync</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={syncImmediate}>
              <Text style={styles.syncButton}>
                Press for dialog-driven sync
              </Text>
            </TouchableOpacity>
            {progressView}
            <TouchableOpacity onPress={toggleAllowRestart}>
              <Text style={styles.restartToggleButton}>
                Restart {restartAllowed ? 'allowed' : 'forbidden'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getUpdateMetadata}>
              <Text style={styles.syncButton}>Press for Update Metadata</Text>
            </TouchableOpacity>
            <Text style={styles.messages}>{syncMessage || ''}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
  },
  messages: {
    marginTop: 30,
    textAlign: 'center',
  },
  restartToggleButton: {
    color: 'blue',
    fontSize: 17,
  },
  syncButton: {
    color: 'green',
    fontSize: 17,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
  },
});

CCodePush = CodePush(codePushOptions)(CCodePush);

export default CCodePush;
