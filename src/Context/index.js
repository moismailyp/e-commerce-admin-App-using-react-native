import React,{  createContext, useContext, useEffect,useState } from "react";
import { useWindowDimensions,Dimensions as dim } from "react-native";

const dimensionContext=createContext();
export const useDimensions=()=>useContext(dimensionContext)

export const DimensionContextProvider=({children})=>
{
    const Dimensions=useWindowDimensions()
    const initialHeight=dim.get('window').height;
    const initialWidth=dim.get('window').width;
    const [height,setHeight]=useState(initialHeight);
    const [isPortrait,setIsportrait]=useState(false)
    const [width,setWidth]=useState(initialWidth);
    checkIsPotrait=()=>
    {
        const dimension=dim.get('screen')
        return dimension.height>=dimension.width;
    }
    useEffect(()=>{
        setSize();

 },[Dimensions])
 useEffect(()=>{
    setIsportrait(checkIsPotrait())
dim.addEventListener('change',()=>{
    setIsportrait(checkIsPotrait())

})
 },[])
 const setSize=()=>
 {
    const{height,width}=Dimensions;
    setHeight(height);
    setWidth(width);
 }
    return(
        <dimensionContext.Provider value={{height,width,isPortrait}}>{children}</dimensionContext.Provider>
    )
}
