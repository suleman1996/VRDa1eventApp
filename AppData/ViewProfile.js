import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Button } from "react-native";
import Background from "../Assets/Background";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";

const ViewProfile = ({ navigation }) => {

  const { user, logout, login } = useContext(AuthContext);

  if (user == "") {
    navigation.replace("Login");
    return false;
  }

  return (
    <SafeAreaView>
      <Background>
        <View
          style={{ height: 100, width: "100%", backgroundColor: "#191919" }}>

          <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>
            <View style={{
              height: 80,
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Image source={require("../Assets/NewLogo.png")}
                     style={{
                       height: 62,
                       width: 100,
                       padding: 20,
                     }} />
            </View>
          </LinearGradient>

        </View>

        <View style={{
          height: 550,
          width: "98%",
          borderWidth: 1,
          borderColor: "#5d5d5d",
          marginLeft: "1%",
          marginRight: "1%",
          marginTop: 5,
          borderRadius: 25,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}>
          <ScrollView>

            <View style={{
              height: 50,
              width: 320,
              alignSelf: "center",
              borderRadius: 30,
              margin:2,
              borderColor: "#62788B",
              borderWidth: 1,
            }}>
              <Text style={{ margin: 15, color: "#fff" }}>{user.name}</Text>
            </View>

            <View style={{
              height: 50,
              width: 320,
              alignSelf: "center",
              borderRadius: 30,
              margin:2,
              borderColor: "#62788B",
              borderWidth: 1,
            }}>
              <Text style={{ margin: 15, color: "#fff" }}>{user.email}</Text>
            </View>

            {user.role == "admin" ? (
                <></>
              ) :
              <View>
                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 30,
                  margin:2,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {user.phone} </Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 30,
                  margin:2,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {user.dob} </Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 30,
                  margin:2,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {user.cnic} </Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 30,
                  margin:2,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {user.country} </Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderRadius: 30,
                  margin:2,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}> {user.nationality} </Text>
                </View>
              </View>
            }

            <TouchableOpacity onPress={() => {
              logout(navigation);
            }}
                              style={{
                                height: 50,
                                width: 300,
                                alignSelf: "center",
                                marginTop: "5%",
                                borderRadius: 30,
                                backgroundColor: "#62788B",
                              }}>

              <Text style={{
                color: "#fff",
                margin: 15,
                textAlign: "center",
              }}>Logout</Text>
            </TouchableOpacity>

            {user.role == "admin" ? (
                <></>
              ) :
              <TouchableOpacity onPress={() => {
                navigation.navigate("UpdateProfile");
              }}
                                style={{
                                  height: 50,
                                  width: 300,
                                  alignSelf: "center",
                                  marginTop: "3%",
                                  borderRadius: 30,
                                  backgroundColor: "#62788B",
                                }}>

                <Text style={{
                  color: "#fff",
                  margin: 15,
                  textAlign: "center",
                }}>Update Profile</Text>
              </TouchableOpacity>
            }

          </ScrollView>
        </View>
      </Background>
    </SafeAreaView>
  );
};
export default ViewProfile;
