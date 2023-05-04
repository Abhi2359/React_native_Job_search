import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import {useFetch} from "../../../hook/useFetch"
import ShowAllCard from "../../common/cards/popular/ShowAllCard.js";
import NearbyJobCard from "../../../components/common/cards/nearby/NearbyJobCard"


const Popularjobs = () => {
  const router = useRouter();
 const {data,isLoading,error} = useFetch('search',{
  query:"React Developer",
  num_pages:1
 })
 
 const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };
  const handleShowAllPress = () => {
   return(
    <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>

        ) : (
          data?.map((job)=>(
         <NearbyJobCard
         job={job}
         key={`nearby-job-${job.job_id}`}
         handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
         />
          ))
        )}
      </View>
   )
  };
  return (
    <View style={styles.header}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
        <ShowAllCard handleShowAllPress={handleShowAllPress} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>

        ) : (
          <FlatList 
         
            data={data}
            renderItem={({item})=>{
              return (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}

                 
                />
              );
            }}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{columnGap:SIZES.medium}}
            horizontal
            
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;