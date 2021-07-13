import React, { useEffect, useContext } from "react";
import { SafeAreaView, View, ImageBackground, Image } from "react-native";
import Background from "../Assets/Background";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../config/AuthProvider";

const Splash = ({ navigation }) => {
  const { auto_login } = useContext(AuthContext);
  useEffect(() => {
      setTimeout(() => {
        AsyncStorage.getItem("USER_ID").then((user) => {
          console.log("@@@@@@@@@@@", user);
          if (user == null || user == "") {
            navigation.replace("EventListing");
          } else {
            auto_login(JSON.parse(user).user, navigation);
          }
        });
      }, 3000);
    },
  );

  return (
    <SafeAreaView>
      <Background>
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image source={require("../Assets/NewLogo.png")} style={{
            height: 160,
            width: "70%",
          }} />
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default Splash;
