import React from 'react'
import { View, TextInput, Button, FlatList, StyleSheet, Text } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = { films: [] }
      }

    _loadFilms() {
        getFilmsFromApiWithSearchedText("star").then(data => {
            this.setState({films: data.results})
          })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput placeholder="Titre du film" style={styles.textInput}></TextInput>
                <Button
                    style={styles.searchBtn}
                    title="Rechercher"
                    onPress={() => this._loadFilms()}
                >
                </Button>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item} />}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
        marginTop: 20,
        flex: 1
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        paddingLeft: 5,
        borderWidth: 1
    },
    searchBtn: {
        height: 50
    }
});

export default Search