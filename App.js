import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
//jostain syystä api latautuu tosi hitaasti.
export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);

  const getRepositories = async () => {
    try {
      const response = await fetch(
        `https://themealdb.com/api/json/v1/1/search.php?s=${keyword}`
      );
      const data = await response.json();
      setRepositories(data.meals);
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{ marginLeft: "10%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.strMeal}
            </Text>
            <Image
              source={{ uri: item.strMealThumb }}
              style={{ width: 200, height: 100 }}
            />
          </View>
        )}
        data={repositories}
        ItemSeparatorComponent={listSeparator}
      />
      <KeyboardAvoidingView style={styles.Text}>
        <TextInput
          style={{ Button }}
          placeholder="Search here"
          onChangeText={(text) => setKeyword(text)}
        />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.Button} onPress={getRepositories}>
        <Text>FIND</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    height: 30,
    width: 50,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "gray",
    borderWidth: 1,
  },
  Text: {
    borderWidth: 1,
    borderColor: "black",
    width: "40%",
    margin: 10,
  },
});
