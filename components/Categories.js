import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import client, { urlFor } from '../sanity';
import CategoryCard from './CategoryCard';

export default function Categories() {
    const [categories, setCategories] = useState([])
    useEffect(()=>{
        client.fetch(`
        *[_type=='category']
        `)
        .then((data)=>setCategories(data))
    },[])
  return (
    <ScrollView
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10
    }}
     horizontal
     showsHorizontalScrollIndicator={false}
     >
        {/* cateory card */}
        {categories.map((category)=>(
            <CategoryCard 
            key={category._id}
            imgUrl={urlFor(category.image).url()} 
            title={category.name}
        />
        ))}
     </ScrollView>
  );
}
