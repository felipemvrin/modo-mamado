import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const REST_CHANNEL_ID = 'rest-timer';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function configureNotifications(): Promise<boolean> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(REST_CHANNEL_ID, {
      name: 'Descanso de entrenamiento',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 300, 150, 300, 150, 300],
    });
  }

  const currentPermissions = await Notifications.getPermissionsAsync();
  if (currentPermissions.granted || currentPermissions.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
    return true;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowBadge: false, allowSound: true },
  });
  return requestedPermissions.granted || requestedPermissions.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
}

export async function scheduleRestFinishedNotification(endAt: number): Promise<string | null> {
  try {
    const allowed = await configureNotifications();
    if (!allowed) return null;
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: 'DESCANSO TERMINADO',
        body: 'Dale nomás. Sigue con la próxima serie.',
        sound: 'default',
        interruptionLevel: 'timeSensitive',
        data: { screen: 'workout' },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(endAt),
        ...(Platform.OS === 'android' ? { channelId: REST_CHANNEL_ID } : {}),
      },
    });
  } catch {
    return null;
  }
}

export async function cancelNotification(identifier: string | null): Promise<void> {
  if (!identifier) return;
  await Notifications.cancelScheduledNotificationAsync(identifier);
}
