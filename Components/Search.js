import React from 'react'
import { View, TextInput, Button, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ''
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
                this.setState({ films: data.results, isLoading: false })
            })
        }
    }

    _searchTextinputChanged(text) {
        this.searchedText = text
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }


    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    onSubmitEditing={() => this._loadFilms()}
                    onChangeText={(text) => this._searchTextinputChanged(text)}
                    placeholder="Titre du film"
                    style={styles.textInput}
                >
                </TextInput>
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
                {this._displayLoading()}
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
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Search