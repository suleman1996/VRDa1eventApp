import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
  ScrollView,
  Dimensions, Button,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Background from "../Stylesheet/Background";
import SmallTextGrid from "./SmallTextGrid";
import axios from "axios";
import HTML from "react-native-render-html";
import { AuthContext } from "../config/AuthProvider";
import * as CON from "../component/Constants";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const eventdetail = ({ navigation, route }) => {
  const contentWidth = useWindowDimensions().width;
  const [refreshing, setRefreshing] = React.useState(false);
  const [update, setUpdate] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    const isFocused = navigation.isFocused();
    var navFocusListener = "";
    // manually judge if the screen is focused
    // if did, fire api call
    if (isFocused) {
      // do the same API calls here
      console.log("focused section");
      check_event();
    }

    navFocusListener = navigation.addListener("didFocus", () => {
      // do some API calls here
      console.log("listener section");
    });

  }, []);


  let item = route.params.item;
  const { user } = useContext(AuthContext);

  const check_event = () => {
    if (user == "") {
      // navigation.navigate("Login");
    } else {
      if (user.role == "user") {
        var body = {
          user_id: user.id,
          event_id: item.id,
        };
        axios.post(CON.URL + "/api/event-visitor", body)
          .then(function(response) {
            if (response.data.message == true) {
              setEvent(response.data.data.event_status);
            } else {
              setEvent("");
            }
          })
          .catch(function(error) {
              console.log(error);
            },
          );
      }
    }
  };

  const userValidation = () => {
    if (user == "") {
      navigation.navigate("Login");
    } else {
      if (user.role == "user") {
        // navigation.navigate("QrCode", {
        //     event: item,
        //   },
        // );
        var body = {
          user_id: user.id,
          event_id: item.id,
        };
        axios.post(CON.URL + "/api/event-visitor", body)
          .then(function(response) {
            if (response.data.message == false) {
              var bodies = {
                user_id: user.id,
                event_id: item.id,
                visiting_status: "pending",
              };
              axios.post(CON.URL + "/api/event-visitor-request", bodies)
                .then(async function(response) {

                  if (response.data.message == true) {
                    alert("Request Sent");
                    await setEvent(response.data.data.event_status);
                  } else {
                    alert("There is Something Wrong");
                  }
                }).catch(function(error) {
                alert("There is something Wrong");
                console.log(error);
              });
            } else {
              if (response.data.data.event_status == "accepted") {
                navigation.navigate("QrCode", {
                    event: item,
                  },
                );
              } else {
                setEvent("");
              }
            }
          })
          .catch(function(error) {
              console.log(error);
            },
          );
      }
    }
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <SafeAreaView>
      <Background style={{ width: "100%", backgroundColor: "blue" }}>
        <View style={{ height: 100, width: "100%", backgroundColor: "#191919" }}>
          <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>

            <View style={{ padding: 10, flexDirection: "row" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image source={require("../Assets/NewLogo.png")}
                       style={{
                         height: 62,
                         width: 100,
                       }} />
              </View>

              {user.role == "admin" ? (
                <></>
              ) : (
                event == "joined" ? (null) : (event == "pending") ? (
                    <TouchableOpacity
                      disabled={true}
                      style={{ alignItems: "flex-end", justifyContent: "center" }} onPress={() => {
                      userValidation();
                    }}>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 20,
                        }}>JOIN</Text>
                    </TouchableOpacity>

                  ) :
                  (event == "accepted" ? (null) :
                      (
                        <>
                          <TouchableOpacity
                            style={{ alignItems: "flex-end", justifyContent: "center" }} onPress={() => {
                            userValidation();
                          }}>
                            <Text
                              style={{
                                color: "#fff",
                                fontSize: 20,
                              }}>JOIN</Text>
                          </TouchableOpacity>
                        </>
                      )
                  )
              )
              }
            </View>

          </LinearGradient>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          style={{
            marginVertical: 5,
            backgroundColor: "rgba(0,0,0,0.4)",
            borderWidth: 1,
            borderColor: "#5d5d5d",
            margin: 10,
            flex: 1,
            padding: 10,
            borderRadius: 5,
            height: Dimensions.get("window").height - 200,
            marginBottom: 100,
          }}>
          <Image source={{ uri: item.image }} style={{ height: 200 }} />
          <View>

            <View style={{ width: "100%", backgroundColor: "#191919", flexDirection: "row" }}>
              <Text style={{
                fontSize: 24,
                paddingLeft: 40,
                paddingTop: 10,
                color: "#FEFEFE",
              }}
              >
                {item.title}
              </Text>


            </View>

            <View
              style={{
                backgroundColor: "#191919",
                height: 85,
                width: "100%",
              }}>
              <SmallTextGrid icon="title" title={item.speaker_name} />
              <SmallTextGrid icon="theme" title={item.event_theme} />
              <SmallTextGrid icon="location" title={item.venue} />

              {user.role == "user" ? (
                <View style={{ width: 70, marginLeft: "75%" }}>
                  {event !== "" ? <Text
                      style={{
                        color: "#fff",
                        backgroundColor: event == "accepted" ? "green" : "orange",
                        width: 80,
                        textAlign: "center",
                        alignSelf: "center",
                      }}>
                      {event}</Text>
                    :
                    null
                  }
                </View>
              ) : null}

            </View>
          </View>

          <View
            style={{
              flex: 1,
              marginBottom: 30,
              backgroundColor: "rgba(0,0,0,0.1)",
              width: "95%",
              marginLeft: "2%",
              marginRight: "3%",
              marginTop: 5,
            }}>
            {/*<HTML source={{ html: item.description }} contentWidth={contentWidth} />*/}
            <Text style={{ color: "#fff", textAlign: "justify" }}>{item.description}</Text>
          </View>
        </ScrollView>

        <View style={{
          backgroundColor: "#fff5",
          borderTopLeftRadius: 38,
          borderTopRightRadius: 38,
          bottom: 0,
          position: "absolute",
          height: 55,
          elevation: 0,
          width: "100%",
        }}>

          {user.role == "admin" ? (
            <></>
          ) : (event == "joined" ? (null) : (event == "pending") ? (

              <TouchableOpacity
                disabled={true}
                onPress={() => {
                  userValidation();
                }}>
                <ImageBackground source={require("../Assets/Qr.png")}
                                 style={{
                                   marginTop: -45,
                                   height: 95,
                                   width: 95,
                                   alignSelf: "center",
                                 }}>
                </ImageBackground>

              </TouchableOpacity>) : (event == "rejected") ? null :
              <TouchableOpacity
                onPress={() => {
                  userValidation();
                }}>
                <ImageBackground source={require("../Assets/Qr.png")}
                                 style={{
                                   marginTop: -45,
                                   height: 95,
                                   width: 95,
                                   alignSelf: "center",
                                 }}>
                </ImageBackground>
              </TouchableOpacity>
          )}
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default eventdetail;
