import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useLayoutEffect } from 'react'
import {  Image, Text, View,TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ArrowLeftIcon,ChevronRightIcon,MapPinIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline'
import {  StarIcon } from 'react-native-heroicons/solid'
import { useDispatch } from 'react-redux'
import { setRestaurent } from '../app/features/RetaurentSlice'
import BasketIcon from '../components/BasketIcon'
import DishRow from '../components/DishRow'
import { urlFor } from '../sanity'

const RestaurentScreen = () => {
    const {params:{id,imgUrl,title,rating,genre,address,short_description,dishes,long,lat}}=useRoute()
    const navigation=useNavigation()
    const dispatch=useDispatch()

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])
    useEffect(()=>{
        dispatch(setRestaurent({
            id,imgUrl,title,rating,genre,address,short_description,dishes,long,lat
        }))
    },[dispatch])
  return (
    <>
    <BasketIcon/>
    <ScrollView>
      <View className='relative'>
        <Image 
            source={{
                uri:urlFor(imgUrl).url(),
            }}
            className='w-full h-56 bg-gray-300 p-4'
        />
        <TouchableOpacity className='absolute top-[34] left-5 p-2 bg-gray-100 rounded-full'
        onPress={()=>navigation.navigate('Home')}
        >
            <ArrowLeftIcon size={20} color='#00CC88' />
        </TouchableOpacity>
      </View>
      <View className='bg-white'>
            <View className='px-4 pt-5'>
                <Text className='text-3xl font-bold'>{title}</Text>
                <View className='flex-row space-x-2 my-2'>
                    <View className='flex-row items-center space-x-2'>
                        <StarIcon color='green' opacity={0.5} size={22}/>
                        <Text className='text-xs text-gray-500'>
                            <Text className='text-green-500'>{rating}</Text> - {genre}
                        </Text>
                    </View>
                    <View className='flex-row items-center space-x-2'>
                        <MapPinIcon color='gray' opacity={0.5} size={22}/>
                        <Text className='text-xs text-gray-500'>
                            Near by - {address}
                        </Text>
                    </View>
                </View>

                <Text className='text-gray-400 mt-2 pb-2'>{short_description}</Text>
            </View>
            <TouchableOpacity className='flex-row items-center space-x-2 p-4 border-y border-gray-300'>
                <QuestionMarkCircleIcon color='gray' opacity={0.6} size={20}/>
                <Text className='pt-2 flex-1 text-md font-bold'>
                    Have a food allergy ?
                </Text>
                <ChevronRightIcon color='#00CC88' />
            </TouchableOpacity>
      </View>

      <View className='pb-36'>
        <Text className='px-4 pt-6 font-bold text-xl'>Menu</Text>
        {/* Dishes */}
        {dishes.map((dish)=>(
            <DishRow
            key={dish._id}
            id={dish._id}
            name={dish.name}
            description={dish.short_description}
            price={dish.price}
            image={dish.image}
            />
        ))}
      </View>
    </ScrollView>
    </>
  )
}

export default RestaurentScreen
