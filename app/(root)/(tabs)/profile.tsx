import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TextInput, Pressable, Alert, BackHandler } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";

export default function Profile() {
  const [serialNumber, setSerialNumber] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productCategory, setProductCategory] = useState<string>("");
  const router = useRouter();
  const { scannedData } = useLocalSearchParams();

  // Update serial number with scanned data if available
  useEffect(() => {
    if (scannedData) {
      console.log("Scanned Data Received:", scannedData);
      setSerialNumber(scannedData as string);
    }
  }, [scannedData]);

  // Override back button behavior
  useEffect(() => {
    const handleBackPress = () => {
      router.replace("/"); // Redirect to the Index page
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove(); // Cleanup listener on unmount
  }, [router]);

  const handleSubmit = () => {
    if (!serialNumber || !productName || !productCategory) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }

    console.log("Submitted Data:", {
      serialNumber,
      productName,
      productCategory,
    });

    Alert.alert(
      "Submitted",
      `Serial Number: ${serialNumber}\nProduct Name: ${productName}\nCategory: ${productCategory}`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <Stack.Screen options={{ title: "Profile", headerShown: false }} />
      <Text className="text-3xl text-black mb-6 text-center">
        Product Entry Form
      </Text>

      {/* Serial Number Field */}
      <Text className="text-black text-lg mb-2">Serial Number</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4 text-black bg-gray-100"
        placeholder="Enter Serial Number"
        placeholderTextColor="#666"
        value={serialNumber}
        onChangeText={setSerialNumber}
      />

      {/* Scan Button */}
      <Pressable
        className="bg-blue-500 p-3 rounded-md mb-6 items-center"
        onPress={() => {
          router.push("/scanner");
        }}
      >
        <Text className="text-white text-lg">Scan Serial Number</Text>
      </Pressable>

      {/* Product Name Field */}
      <Text className="text-black text-lg mb-2">Product Name</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-4 text-black bg-gray-100"
        placeholder="Enter Product Name"
        placeholderTextColor="#666"
        value={productName}
        onChangeText={setProductName}
      />

      {/* Product Category Field */}
      <Text className="text-black text-lg mb-2">Product Category</Text>
      <Picker
        selectedValue={productCategory}
        onValueChange={(value: string) => setProductCategory(value)}
        className="bg-gray-100 text-black mb-6"
      >
        <Picker.Item label="Select a category" value="" />
        <Picker.Item label="Laptop" value="laptop" />
        <Picker.Item label="Mobile" value="mobile" />
        <Picker.Item label="Tablet" value="tablet" />
        <Picker.Item label="Headphones" value="headphones" />
        <Picker.Item label="Smart Watch" value="smart_watch" />
      </Picker>

      {/* Submit Button */}
      <Pressable
        className="bg-green-500 p-3 rounded-md items-center"
        onPress={handleSubmit}
      >
        <Text className="text-white text-lg">Submit</Text>
      </Pressable>
    </SafeAreaView>
  );
}
