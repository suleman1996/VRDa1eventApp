import React from "react";
import { SafeAreaView, Text, View, ImageBackground, Dimensions } from "react-native";
//
// const height = Dimensions('window').height
// const width = Dimensions('window').width
const Background = ({children}) => {
  return (
    <SafeAreaView style={{}}>
      <ImageBackground source={require("../Assets/background.png")}
                       style={{
                         height: "100%",
                         // height: Dimensions.get('screen').width,
                         width:Dimensions.get('screen').width,
                       }}>
<View style={{flex:1}}>
  {children}

</View>
      </ImageBackground>

    </SafeAreaView>
  );
};
export default Background;
