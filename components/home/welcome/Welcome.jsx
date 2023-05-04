import React, {useState} from 'react'
import { 
  View,
   Text ,
   TextInput,
   TouchableOpacity,
   FlatList,
   Image

} from 'react-native';
import {useRouter  } from "expo-router";
import {icons,SIZES} from "../../../constants"

import styles from './welcome.style'

const jobTypes = ["Full-time", "Part-time", "Contractor"]

const Welcome = ({searchTerm,setSearchTerm,handleClick}) => {
  const [activeJobType, setactiveJobType] = useState("Full Time")
  const router = useRouter();
  return (
    <View>
     <View style={styles.container}>
      <Text style={styles.userName}>Hello Abhishek</Text>
      <Text style={styles.welcomeMessage}>Find Your Perfect Job</Text>
     </View>

     <View style={styles.searchContainer}>
      <View style ={styles.searchWrapper}>
     <TextInput 
     style={styles.searchInput}
     value={searchTerm}
     onChangeText={(text)=>setSearchTerm(text)}
     placeholder='What are you looking for ?'
     
     />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
        <Image
        source={icons.search}
        resizeMode='contain'
        style={styles.searchBtnImage}
        />
      </TouchableOpacity>
     </View>
      <View style ={styles.tabsContainer}>
        <FlatList
        data ={jobTypes}
        renderItem={({item})=>{
          return(

          <TouchableOpacity style={styles.tab(activeJobType,item)}
          onPress={()=>{
            setactiveJobType(item);
            router.push(`/search/${item}`)
          }}
          >
            <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
          </TouchableOpacity>
          );
        }}
        keyExtractor={item=>item}
        contentContainerStyle={{columnGap:SIZES.small}}
        horizontal
        />
      </View>
    </View>
  )
}

export default Welcome;