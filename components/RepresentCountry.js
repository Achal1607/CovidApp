import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Image, Card, Button } from 'react-native-elements'
import { formatNumber } from '../utils/functions'

function RepresentCountry(props) {
    const date = new Date(props.today.updated).toString()
    const splitDate = date.split(' ')
    const updatedDate = splitDate[1] + ' ' + splitDate[2] + ', ' + splitDate[3] + ' ' + splitDate[4]
    return (
        <View>
            <View style={styles.row}>
                <Card raised title='Confirm Cases' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.cases))}</Text>
                    <Text style={styles.small}>
                        {isNaN(props.today.todayCases)
                            ? ''
                            : props.today.todayCases > 0
                                ? '+' + formatNumber(props.today.todayCases)
                                : '+0'}
                    </Text>
                </Card>

                <Card raised title='Active Cases' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>
                        {parseInt(props.today.recovered) !== 0 ?
                            formatNumber(parseInt(props.today.active)) : 'N/A'}
                    </Text>
                </Card>
            </View>

            <View style={styles.row}>
                <Card raised title='Recovered' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    {parseInt(props.today.recovered) !== 0 ?
                        <View>
                            <Text style={styles.text}>{formatNumber(parseInt(props.today.recovered))}</Text>
                            <Text style={styles.small}>
                                {isNaN(props.today.todayRecovered)
                                    ? ''
                                    : props.today.todayRecovered > 0
                                        ? '+' + formatNumber(props.today.todayRecovered)
                                        : '+0'}
                            </Text>
                        </View> : <Text style={styles.text}>{'N/A'}</Text>}
                </Card>

                <Card raised title='Deaths' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.deaths))}</Text>
                    <Text style={styles.small}>
                        {isNaN(props.today.todayDeaths)
                            ? ''
                            : props.today.todayDeaths > 0
                                ? '+' + formatNumber(props.today.todayDeaths)
                                : '+0'}
                    </Text>
                </Card>
            </View>

            <View style={styles.row}>
                <Card raised title='Samples Tested' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.tests))}</Text>
                </Card>

                <Card raised title='Critical' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.critical))}</Text>
                </Card>
            </View>

            <View style={styles.row}>
                <Card raised title='Cases per Million' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.casesPerOneMillion))}</Text>
                </Card>

                <Card raised title='Active Per Million' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.activePerOneMillion))}</Text>
                </Card>
            </View>
            <View style={styles.row}>
                <Card raised title='Tests per Million' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.testsPerOneMillion))}</Text>
                </Card>

                <Card raised title='Recovered Per Million' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.recoveredPerOneMillion))}</Text>
                </Card>
            </View>
            <View style={styles.row}>

                <Card raised title='Critical Per Million' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{formatNumber(parseInt(props.today.criticalPerOneMillion))}</Text>
                </Card>


                <Card raised title='Updated On' containerStyle={styles.box} titleStyle={styles.title} dividerStyle={styles.line}>
                    <Text style={styles.text}>{updatedDate}</Text>
                </Card>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#352f44',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#00fff5'
    },
    title: {
        color: 'orange',
        fontSize: 24
    },
    box: {
        flex: 1,
        backgroundColor: '#2a2438',
        borderRadius: 10
    },
    small: {
        fontSize: 15,
        textAlign: 'center',
        color: 'gray'
    },
    line: {
        backgroundColor: 'gray'
    }
})

export default RepresentCountry
