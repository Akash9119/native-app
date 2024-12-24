import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/sign-in'); // Prevents back navigation to this page
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-3xl font-bold text-black text-center">
        Welcome to the Inventory Management App
      </Text>
    </View>
  );
};

export default Index;
