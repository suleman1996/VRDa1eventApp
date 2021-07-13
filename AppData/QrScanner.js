import React, { useContext, useState, useEffect } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { View, SafeAreaView, Text, Linking, Alert, ImageBackground, Image, ScrollView } from "react-native";
import { RNCamera } from "react-native-camera";
import * as CON from "../component/Constants";
import Background from "../Stylesheet/Background";
import base64 from "react-native-base64";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { AuthContext } from "../config/AuthProvider";

const QRScanner = ({}) => {
  const { user } = useContext(AuthContext);
  const [userid, setUserid] = useState("");
  const [eventid, setEventid] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [speakername, setSpeakername] = useState("");
  const [venue, setVenue] = useState("");
  const [eventlocation, setEventLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  const ifScaned = (e, navigation) => {
    console.log("_______________________________ ye chalnaa chaye");
    console.warn(e);
    var response_data = JSON.parse(base64.decode(e.data));
    if (response_data.em !== "" || response_data.em !== undefined) {
      setEmail(response_data.em);
      setName(response_data.nm);
      setTitle(response_data.et);
      setImage(response_data.ei);
      setSpeakername(response_data.es);
      setVenue(response_data.Ev);
      setEventLocation(response_data.el);
      setStartTime(response_data.est);
      setEndTime(response_data.eet);
      let data = {
        "user_id": response_data.us,
        "event_id": response_data.ev,
        event_status: "pending",
      };
      axios.post(CON.URL + `/api/mark_attendance`, data)
        .then((res) => {
          console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
          setUserid(res.data);
          setEventid(res.data);
          if (res.data.success == true) {
            alert(res.data.message);
          } else {
            console.log("gdjahdkjashfksjhfksjhfkshfskhkshfskhfskjhfkshf", res);
          }

        }).catch((err) => {
          // alert("Scanning Failed");
          console.log(err);
        },
      );
    } else {
      alert("Failed due to scanner issue.");
      console.log("false");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Background>
        {userid ? (
          <>
            <View style={{ height: 180, width: "100%", backgroundColor: "#191919" }}>
              <LinearGradient colors={["#231F20", "#312A2C"]} style={{ marginTop: 20 }}>
                <View style={{
                  padding: 10,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Image source={require("../Assets/NewLogo.png")}
                         style={{
                           height: 62,
                           width: 100,
                         }} />
                </View>
              </LinearGradient>
            </View>

            <ScrollView>
              <View style={{
                // height: 300,
                flex: 1,
                width: "98%",
                borderWidth: 1,
                borderColor: "#5d5d5d",
                marginLeft: "1%",
                marginRight: "1%",
                marginTop: 2,
                borderRadius: 25,
                backgroundColor: "rgba(0,0,0,0.4)",
              }}>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  marginTop: "5%",
                  borderRadius: 30,
                  borderColor: "#62788B",
                  borderWidth: 1,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Name: {name} </Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                  margin: 5,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Title: {title}</Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                  margin: 5,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Speaker Name: {speakername}</Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Venue: {venue}</Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                  margin: 5,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Location: {eventlocation}</Text>
                </View>

                <View style={{
                  height: 50,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                }}>
                  <Text style={{ margin: 15, color: "#fff" }}>Time: {startTime}</Text>
                </View>

                <View style={{
                  height: 200,
                  width: 320,
                  alignSelf: "center",
                  borderWidth: 1,
                  borderColor: "#62788B",
                  borderRadius: 30,
                  margin: 5,
                }}>
                  <Image
                    style={{
                      borderWidth: 1,
                      borderRadius: 30,
                      width: "100%",
                      height: "100%",
                    }}
                    source={{ uri: image }} />
                </View>

              </View>
            </ScrollView>
          </>
        ) : (
          <>
            <QRCodeScanner
              onRead={ifScaned}
              flashMode={RNCamera.Constants.FlashMode.off}
              reactivate={true}
              permissionDialogMessage="Need Permission to access camera"
              reactivateTimeout={1000}
              showMarker={true}
              cameraStyle={{ height: 300, width: "100%", justifyContent: "center", alignSelf: "center" }}
              cameraProps={{ autoFocus: "on" }}
              markerStyle={{ borderColor: "#890021", borderRadius: 10 }}
            />
          </>
        )}
      </Background>
    </SafeAreaView>
  );
};
export default QRScanner;
