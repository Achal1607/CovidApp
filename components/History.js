import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { formatNumber } from '../utils/functions'

function History(props) {
    const RenderRow = (data) => {
        return (

            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: 400 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={400}
                decelerationRate="normal"
                key={data.date}
            >
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text style={styles.stateStyle}>
                            {data.date}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={{ ...styles.tableText, marginLeft: 20 }}>
                            {formatNumber(data.totalconfirmed)}
                            {data.dailyconfirmed > 0 ?
                                <Text style={{ color: 'red' }}>{'\n'}&#8593;{formatNumber(data.dailyconfirmed)}</Text> : null}
                        </Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>{formatNumber(data.totalrecovered)}
                            {data.dailyrecovered > 0 ?
                                <Text style={{ color: 'green' }}>{'\n'}&#8593;{formatNumber(data.dailyrecovered)}</Text> : null}
                        </Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>{formatNumber(data.totaldeceased)}
                            {data.dailydeceased > 0 ?
                                <Text style={{ color: 'gray' }}>{'\n'}&#8593;{formatNumber(data.dailydeceased)}</Text> : null}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    const data = props.data
    return (
        <View style={styles.table}>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: 400 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={400}
                decelerationRate="normal"
            >
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text style={styles.stateStyle}>Date</Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={{ ...styles.tableText, marginLeft: 20 }}>Confirm</Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>Recovered</Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>Deaths</Text>
                    </View>
                </View>
            </ScrollView>

            {data.reverse().map((data) => {
                return RenderRow(data)
            })}
        </View>

    )
}


const styles = StyleSheet.create({
    table: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    tableRow: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    tableCell: {
        flex: 1,
        alignSelf: 'stretch',
    },
    tableText: {
        backgroundColor: '#2a2438',
        marginRight: 'auto',
        color: '#A9A9A9',
        height: 50,
        width: 80,
        margin: 2,
        marginLeft: 20,
        paddingBottom: 5,
        paddingTop: 5,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 10
    },
    stateStyle: {
        backgroundColor: '#2a2438',
        width: 100,
        margin: 2,
        color: '#A9A9A9',
        fontWeight: 'bold',
        textAlign: 'center',
        height: 50,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 10
    }
})


export default History
