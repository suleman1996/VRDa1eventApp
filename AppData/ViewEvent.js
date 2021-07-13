import React, { useState, useEffect, useContext } from "react";
import { Text, View, Image, FlatList, ActivityIndicator, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView }
  from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import SmallTextGrid from "./SmallTextGrid";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";

const URL = CON.URL + "/api/get-all-events";

export const ViewEvent = ({ navigation, item }) => {
  const { user, appData } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [data, setdata] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((json) => {
        json.data.reverse();
        setdata(json.data);
        setLoading(false);

      })
      .catch((error) => {
        alert(" check your internet connection...");
        // setErrorText({ msg: "check your internet connection." });
        return error;

      })
      .finally();
  }, []);

  return (
    <SafeAreaView>
      <Background>
        <View style={{ height: 200, width: "100%", backgroundColor: "#191919" }}>
          <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>
            <View style={{
              flexDirection: "row",
              padding: 10,
            }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require("../Assets/NewLogo.png")}
                       style={{
                         height: 62,
                         width: 100,

                       }} />
              </View>

              {user.role == "admin" ? (
                <TouchableOpacity
                  style={{ alignItems: "flex-end", justifyContent: "center",  }}
                  onPress={() => navigation.navigate("QrScanner")}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    source={require("../Assets/qrcode.png")} />
                </TouchableOpacity>
              ) : null}

            </View>
          </LinearGradient>

          <View
            style={{ height: 25, margin: 30 }}>
            <Text
              style={{
                color: "#F8F8F8",
                fontSize: 20,
              }}>PLAN IT OUT </Text>
            <Text style={{ fontSize: 15, color: "#F8F8F8" }}>
              ALL EVENTS
            </Text>
          </View>
        </View>

        {isLoading == true ?
          <ActivityIndicator animating={isLoading} size="large" color="white" style={{
            justifyContent: "center", alignItems: "center", flex: 1,
          }} />
          :

          <View
            style={{
              height: "64%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>

            {/*<View style={{ justifyContent: "center", flex: 1 }}>*/}
            {/*  <Text*/}
            {/*    style={{*/}
            {/*      color: "red",*/}
            {/*      fontSize: 22,*/}
            {/*    }}>{errorText.msg}</Text>*/}
            {/*</View>*/}


            <FlatList
              data={data}
              style={{ width: "100%" }}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={{
                    marginVertical: 5,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    borderWidth: 1,
                    borderColor: "#5d5d5d",
                    margin: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => navigation.navigate("EventDetails", {
                    item: item,
                  })}>

                  <View
                    style={{
                      backgroundColor: "#5d5d5d",
                      width: "94%",
                      margin: "3%",
                      flex: 1,
                      height: 300,
                    }}>

                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={{ uri: item.image }} />

                    <LinearGradient
                      colors={["#000",
                        "#b1b0b0",
                        "transparent"]}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        height: 45,
                        width: "100%",
                        opacity: 0.8,
                        position: "absolute",
                        bottom: 0,
                        zIndex: 100,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#fff",
                          paddingLeft: 15,
                          paddingTop: "3%",
                          fontSize: 18,
                        }}>{item.short_description}</Text>
                    </LinearGradient>
                  </View>

                  <SmallTextGrid icon="title" title={item.title} />
                  <SmallTextGrid icon="location" title={item.venue} />
                  <SmallTextGrid icon="dresscode" title={item.event_dress} />
                  <SmallTextGrid icon="time" title={item.start_time} />
                </TouchableOpacity>
              )}
            />
          </View>

        }


      </Background>
    </SafeAreaView>
  );
};
