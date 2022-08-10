import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
import React, { useState } from "react";

import axios from "axios";
import { Button, Icon } from "react-native-elements";

export default function Movies() {
  //const apiurl = "https://api.themoviedb.org/3/movie/550?api_key=ab547ad98e5eb023b4bf675939abce34"
  const apiurl = "https://www.omdbapi.com/?apikey=dfe6d885";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  //Funcion busqueda
  const search = () => {
    if (state.s != "") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;
        setState((prevState) => {
          return { ...prevState, results: results };
        });
      });
    }
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peliculas</Text>
      <Button type="solid" onPress={search} values={state.s}>
        <Icon name="home" color="white" /> Icon
      </Button>
      <TextInput
        style={styles.searchbox}
        placeholder="Escriba un titulo de pelicula"
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.imdbID)}
          >
            <View style={styles.results}>
              <Image
                source={{ uri: result.Poster }}
                style={{
                  width: "100%",
                  height: 300,
                }}
                resizeMode="cover"
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != "undefined"}
      >
        <View style={styles.popup}>
          <Text style={styles.poptitle}>{state.selected.Title}</Text> 
          <Image
                source={{ uri: state.selected.Poster }}
                style={{
                  width: "100%",
                  height: 300,
                }}
                resizeMode="cover"
              />
          <Text style={{ marginBottom: 20 }}>
            Rating: {state.selected.imdbRating}
          </Text>
          <Text>{state.selected.Plot}</Text>
          <Text>{state.selected.page}</Text>
        </View>
        <TouchableHighlight
          onPress={() =>
            setState((prevState) => {
              return { ...prevState, selected: {} };
            })
          }
        >
          <Text style={styles.closebtn}>Cerrar</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223343",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "70",
    paddingHorizontal: "20",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
    backgroundColor: "#445565",
  },
  popup: {
    padding: 20,
  },
  poptitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  closebtn: {
    padding: 20,
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#2484C4",
    textAlign: 'center'
  },
});
