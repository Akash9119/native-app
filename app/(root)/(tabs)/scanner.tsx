import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const [scanned, setScanned] = useState(false); // State to track if scanning is complete

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
        setScanned(false); // Reset scanning state when the app is reactivated
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (data && !qrLock.current && !scanned) {
      qrLock.current = true;
      setScanned(true); // Set scanned to true to prevent further scans

      setTimeout(() => {
        Alert.alert("Scanned Data", data);

        // Pass scanned data back to the profile page
        router.push({
          pathname: "/profile",
          params: { scannedData: data },
        });
      }, 500);
    }
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Barcode Scanner",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      {!scanned && ( // Only render the camera if scanning is not complete
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
        />
      )}
    </SafeAreaView>
  );
}
