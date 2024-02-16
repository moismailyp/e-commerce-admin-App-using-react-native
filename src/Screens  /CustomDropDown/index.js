import Accordion from 'react-native-collapsible/Accordion';
import { View,Text,TouchableOpacity,FlatList, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import { useState } from 'react';
const CustomDropDown=(props)=>{
    const {data,setData,categoryName}=props;
    const [currentActiveSections,setActiveSection]=useState([])
    const [selected,setSelected]=useState(categoryName)
const SECTIONS=[{id:0,sectionData:data[0].name}]
    const renderHeader=()=>{
        return(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <Text style={{color:'black',fontSize:16,fontFamily:'Lato-Bold'}}>{selected}</Text>
                <AntDesign name="down" size={25} color={"black"} />
            </View>
        )

    }

    const renderContent=()=>{
        return(
            <FlatList data={data} style={{marginTop:10}} renderItem={({item,index})=>{
                if(item===selected)
                {
                    return null
                }
                else
                {
                    return(
                <TouchableOpacity onPress={()=>{setSelected(item.name),setActiveSection([]),setData(item)}}
                style={{borderTopColor:'black',borderTopWidth:StyleSheet.hairlineWidth,paddingVertical:10}}>
                    <Text>{item.name}</Text>
                 </TouchableOpacity>)}
            }
            
        }/>
        )
    }
    const updateSections=(currentActiveSections)=>{
       setActiveSection(currentActiveSections)
    }
    return(
        <Accordion
        activeSections={currentActiveSections}
        sections={SECTIONS}
        // renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        underlayColor={"transparent"}
        sectionContainerStyle={{borderRadius:15,borderWidth:1,padding:15,borderColor:'green'}}
        paddingVertical
      />
    )
}
export default CustomDropDown