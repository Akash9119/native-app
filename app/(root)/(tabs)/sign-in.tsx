import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { Link } from 'expo-router'

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-white h-full" style={{ flex: 1 }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Image 
          source={images.onboarding} 
          className="w-full h-4/6" 
          resizeMode="contain"
        />

        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to InManage
          </Text>

          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get that {"\n"}
            <Text className="text-primary-300">Managed</Text>
          </Text>

          <TouchableOpacity 
            onPress={handleLogin} 
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex justify-center items-center"
          ><Link href="/profile">
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Start Scanning Inventory
              </Text>
            </Link>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;