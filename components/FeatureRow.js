import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import { ScrollView } from 'react-native-gesture-handler'
import RestaurentCard from './RestaurentCard'
import client from '../sanity'

const FeatureRow = ({id,title,description}) => {
  const [restorents, setRestorents] = useState([])
  useEffect(()=>{
    client.fetch(`
      *[_type=='featured' && _id == $id]{
        ...,
        resturents[]->{
          ...,
          dishes[]->,
          type->{
            name
          }
        }
      }
      
    `,{id})
    //id:id params
    .then((data)=>{
      setRestorents(data[0].resturents)
    })
  },[]) 
  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color='#00CCBB'/>
      </View>
      <Text className='text-xs text-gray-500 px-4'>{description}</Text>
      <ScrollView 
      horizontal
      contentContainerStyle={{
        paddingHorizontal:13,
      }}
      showsHorizontalScrollIndicator={false}
      className='pt-4'
      >
        {/* restaurents cards */}
        {restorents.map((restorent)=>(
          <RestaurentCard
          key={restorent._id} 
          id={restorent._id}
          imgUrl={restorent.image || 'https://links.papareact.com/gn7'}
          title={restorent.title}
          rating={restorent.rating}
          genre={restorent.type?.name}
          address={restorent.address}
          short_description={restorent.short_description}
          dishes={restorent.dishes}
          long={restorent.long}
          lat={restorent.lat}
      />
        ))}
        
      </ScrollView>
      
    </View>
  )
}

export default FeatureRow