import { View, Text, Image } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectReataurent } from '../app/features/RetaurentSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../app/features/basketSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Currency from 'react-currency-formatter'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'

const BasketScreen = () => {
    const navigation=useNavigation()
    const restaurent=useSelector(selectReataurent)
    const items=useSelector(selectBasketItems)
    const total=useSelector(selectBasketTotal)
    const dispatch=useDispatch()
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])

    useMemo(()=>{
        const groupedItems=items.reduce((results,item)=>{
            (results[item.id]=results[item.id] || [] ).push(item)
            return results
        },{})
        setGroupedItemsInBasket(groupedItems)
    },[items])
    //console.log(groupedItemsInBasket)
    if (items.length===0) return null
  return (
    <SafeAreaView className=' flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 w-full  flex-row  justify-between border-[#00CCBB] bg-white shadow-sm'>
            <View className=''>
                <Text className='text-lg font-bold text-center'>Basket</Text>
                <Text className='text-center text-gray-400'>{restaurent.title}</Text>
            </View>
            <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100'
            >
                <XCircleIcon color='#00CC88' size={50}/>
            </TouchableOpacity>
        </View>

        <View className='flex-row items-center  space-x-4 px-4 py-3 bg-white my-5'>
            <Image
            source={{uri:'https://links.papareact.com/wru'}}
            className='h-7 w-7 bg-gray-300 p-4 rounded-full'
            />
            <Text className='flex-1'>Deliver in 58 - 75 min</Text>
            <TouchableOpacity>
                <Text className='text-[#00CCBB]'>Change</Text>
            </TouchableOpacity>
        </View>

        <ScrollView className='divide-y divide-gray-200'>
            {Object.entries(groupedItemsInBasket).map(([key,items])=>(
                <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                    <Text className='text-[#00CCBB]' >{items.length} x</Text>
                    <Image
                    source={{uri:urlFor(items[0]?.image).url()}}
                    className='h-12 w-12 rounded-full'
                    />
                    <Text className='flex-1'>{items[0]?.name}</Text>
                    <Text className='text-gray-400'>
                        <Currency quantity={items[0]?.price} currency='USD'/>
                    </Text>
                    <TouchableOpacity
                    onPress={()=>dispatch(removeFromBasket({id:key}))}
                    >
                        <Text className='text-[#00CCBB] text-xs'>Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4'>
            <View className='flex-row justify-between'>
                <Text className='text-gray-400'>Subtotal</Text>
                <Text className='text-gray-400'>
                    <Currency quantity={total} currency='usd' />
                </Text>
            </View>

            <View className='flex-row justify-between'>
                <Text className='text-gray-400'>Delivery Fee</Text>
                <Text className='text-gray-400'>
                    <Currency quantity={5.99} currency='usd' />
                </Text>
            </View>

            <View className='flex-row justify-between'>
                <Text >Order Total</Text>
                <Text className='font-extrabold'>
                    <Currency quantity={total+5.99} currency='usd' />
                </Text>
            </View>

            <TouchableOpacity
            onPress={()=>navigation.navigate('Preparing')}
            className='rounded-lg bg-[#00ccbb] p-4'
            >
                <Text className='text-center text-white text-lg font-bold'>Place Order</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen