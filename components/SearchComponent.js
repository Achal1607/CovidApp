import React, { Component } from 'react'
import Autocomplete from 'react-native-autocomplete-input'
import { TouchableOpacity, Text } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

export class Search extends Component {
    constructor(props) {
        super(props)

        this.state = {
            query: null,
            data: [],
            name: null
        }
    }

    SearchFilterFunction(text) {
        //passing the inserted text in textinput
        if (text !== '' || text !== null) {
            const newData = this.props.country.filter((item) => {
                //applying filter for the inserted text in search bar
                const itemData = item.country.toUpperCase()
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            });
            this.setState({
                //setting the filtered newData on datasource
                //After setting the data it will automatically re-render the view
                data: newData.map(item => (item.country)),
                query: text,
            });
        }
        else {
            this.setState({ query: null })
        }
    }

    render() {
        const { navigate } = this.props.navigation
        if (this.state.name) {
            const country = this.state.name
            this.setState({ name: null, query: null })
            navigate("Country", { name: country.toUpperCase() })
        }
        return (
            <Autocomplete
                hideResults={this.state.query === null || this.state.query === '' ? true : false}
                data={this.state.data}
                defaultValue={this.state.query}
                placeholder="Search Country"
                onChangeText={text => this.SearchFilterFunction(text)}
                renderItem={({ item, i }) => (
                    <TouchableOpacity
                        onPress={(text) => this.setState({ name: item })}>
                        <Text style={{ color: 'white', fontSize: 20,backgroundColor:'#5a082d' }}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }
}

export default withNavigation(Search)
