import React, { useState, useContext } from "react";
import { Text, SafeAreaView, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Background from "../Stylesheet/Background";
import LinearGradient from "react-native-linear-gradient";
import * as CON from "../component/Constants";
import { AuthContext } from "../config/AuthProvider";
import axios from "axios";
import DatePicker from "react-native-datepicker";
import { Symbol } from "react-native-svg";
import { symbolicate } from "react-native/Libraries/LogBox/Data/LogBoxSymbolication";

const UpdateProfile = () => {
  const { user } = useContext(AuthContext);

  const [id, setID] = useState(user["id"]);
  const [name, setName] = useState(user["name"]);
  const [email, setEmail] = useState(user["email"]);
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [cnic, setCnic] = useState("");
  const [country, setCountry] = useState("");
  const [nationality, setNationality] = useState("");
  const [setLoading] = useState("");


  const handleSubmitButton = () => {
    // setErrortext("");
    if (!name) {
      alert("Please fill name");
      return;
    }
    if (!email) {
      alert("Please fill email");
      return;
    }

    {
      if (!phone) {
        alert("Please fill phone");
        return;
      } else if (phone.length < 11) {
        alert("phone number is incorrect");
        return;
      } else if (phone.length > 20) {
        alert("phone number digit is exceeded");
        return;
      }
    }


    {
      if (!dob) {
        alert("please fill D/O/B");
        return;
      } else if (dob <= 18) {
        alert("Older than 18 years");
        return;
      }
    }

    {
      if (!cnic) {
        alert("Please fill cnic");
        return;
      } else if (cnic.length < 13) {
        alert("Please fill correct cnic");
        return;
      }
    }


    if (!country) {
      alert("Please fill country");
      return;
    }
    if (!nationality) {
      alert("Please fill nationality");
      return;
    }

    let formdata = new FormData();
    formdata.append("id", id);
    formdata.append("name", name);
    formdata.append("phone", phone);
    formdata.append("dob", dob);
    formdata.append("email", email);
    formdata.append("cnic", cnic);
    formdata.append("country", country);
    formdata.append("nationality", nationality);

    console.log(nationality, "nationltyyyyyyy");

    axios.post(CON.URL + "/api/update-profile", formdata)
      .then(function(response) {
        var jsonData = JSON.stringify(response);
        console.log("jahdkjsdksjlksjfkdjsklksl", response.data);
        if (response.data == true) {
          alert("Info updated successfully.");
        } else {
          alert("update successfully");
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    // fetch(CON.URL + "/api/update-profile/", {
    //   method: "POST",
    //   body: data,
    // }).then(responseJson => {
    //   alert("0-0-0-0-0-0-0-0", JSON.stringify(responseJson.data));
    //
    //   // var jsonData = JSON.parse(responseJson["profile"]);
    //   // alert("helooooooooo",jsonData);
    //   // if (responseJson["success"] == 1) {
    //   //   alert("Info updated successfully.");
    //   // } else {
    //   //   alert("update failed");
    //   // }
    //   // setLoading(false);
    // }).catch(error => {
    //   // console.error(errorrrrrrrrrrrrrrrrrrrrrrrr);
    //   console.log("failed");
    //   // setLoading(false);
    // });

    // setLoading(true);
  };
  return (
    <SafeAreaView>
      <Background>
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
            </View>
          </LinearGradient>
        </View>

        <ScrollView>
          <View
            style={{
              height: 600,
              width: "98%",
              borderWidth: 1,
              borderColor: "#5d5d5d",
              marginLeft: "1%",
              marginRight: "1%",
              marginTop: 5,
              borderRadius: 25,
              backgroundColor: "rgba(0,0,0,0.4)",
            }}>
            <View
              style={{
                height: 265,
                width: 400,
                //  marginTop: 20,
                padding: 10,
                alignSelf: "center",
              }}>
              <TextInput
                placeholder="     Name"
                placeholderTextColor="white"
                editable={false}
                onChangeText={name => setName(name)}
                value={name}
                style={{
                  borderBottomWidth: 1,
                  color: "#fff",
                  height: 50,
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Email"
                onChangeText={email => setEmail(email)}
                value={email}
                editable={false}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     Phone"
                onChangeText={phone => setPhone(phone)}
                value={phone}
                numaric
                keyboardType="number-pad"
                maxLength={20}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <DatePicker
                style={{ width: 300, alignSelf: "center", margin: 6, marginTop: 15 }}
                date={dob}
                value={dob}
                mode="date"
                placeholder="        D/O/B"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginRight: 0,
                  },
                  dateText: {
                    fontSize: 14,
                    color: "#fff",
                    paddingLeft: 10,
                    textAlign: "left",
                  },
                  dateInput: {
                    marginLeft: 6,
                    marginRight: 6,
                    alignItems: "flex-start",
                    borderTopWidth: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={dob => setDob(dob)}
              />

              <TextInput
                placeholder="     CNIC"
                onChangeText={cnic => setCnic(cnic)}
                value={cnic}
                numaric
                keyboardType="number-pad"
                maxLength={16}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TextInput
                placeholder="     country"
                onChangeText={country => setCountry(country)}
                value={country}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />
              <TextInput
                placeholder="     Nationality"
                onChangeText={nationality => setNationality(nationality)}
                value={nationality}
                placeholderTextColor="white"
                style={{
                  borderBottomWidth: 1,
                  height: 50,
                  color: "#fff",
                  width: "75%",
                  alignSelf: "center",
                  borderColor: "#989292",
                }} />

              <TouchableOpacity
                onPress={() => {
                  handleSubmitButton();
                }}
                style={{
                  height: 50,
                  width: "70%",
                  margin: 20,
                  justifyContent: "center",
                  alignSelf: "center",
                  borderRadius: 30,
                  backgroundColor: "#62788B",
                }}>
                <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};
export default UpdateProfile;
