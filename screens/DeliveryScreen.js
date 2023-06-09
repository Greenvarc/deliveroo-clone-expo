import { View, Text, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectReataurent } from '../app/features/RetaurentSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { XMarkIcon } from 'react-native-heroicons/outline'
import * as Progress from 'react-native-progress';
import MapView,{Marker} from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation=useNavigation()
    const restaurent=useSelector(selectReataurent)
  return (
    <View className='bg-[#00ccbb] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
            <TouchableOpacity
            onPress={()=>navigation.navigate('Home')}
            >
                <XMarkIcon color='white' size={30}/>
            </TouchableOpacity>
            <Text className='font-light text-white text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md'>
            <View className='flex-row justify-between'>
                <View>
                    <Text className='text-lg text-gray-400'>Estimed Arrival</Text>
                    <Text className='text-4xl font-bold'>44-55 Minutes</Text>
                </View>
                <Image
                source={{uri:'https://i.giphy.com/media/gsr9MG7bDvSRWWSD1Y/giphy.webp'}}
                className='w-20 h-20'
                />
            </View>
            <Progress.Bar size={30} color='#00ccbb' indeterminate={true}/>
            <Text className='mt-3 text-gray-500'> Your order at '{restaurent.title} is being prepared</Text>
        </View>
      </SafeAreaView>
      <MapView
      initialRegion={{
        latitude:restaurent.lat,
        longitude:restaurent.long,
        // latitudeDelta:0.005,
        // longitudeDelta:0.005
      }}
      className='flex-1 -mt-10 z-0'
      mapType='mutedStandard'
      >
        <Marker
        coordinate={{
            latitude:restaurent.lat,
            longitude:restaurent.long,
        }}
        title={restaurent.title}
        description={restaurent.short_description}
        identifier='origin'
        pinColor='#00ccbb'
        />
      </MapView>
      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-28'>
        <Image source={{uri:'https://links.papareact.com/wru'}}
        className='w-12 h-12 bg-gray-300 p-4 rounded-full ml-5'
        />
        <View className='flex-1 '>
            <Text className='text-lg'>Green Varch</Text>
            <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00ccbb] text-lg mr-5 font-bold'>Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen