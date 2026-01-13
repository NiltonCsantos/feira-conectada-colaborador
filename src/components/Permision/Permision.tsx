import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as Notifications from 'expo-notifications';


export default () => {
  const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus>();

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const askNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    // setPermissionStatus(status);
  };

  // return (
  //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //     <Text>Permissão para Notificações: {permissionStatus}</Text>
  //     <Button title="Solicitar Permissão" onPress={askNotificationPermission} />
  //   </View>
  // );
}
