import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { View } from 'react-native-animatable'
import { formatNumber } from '../utils/functions'
import { withNavigation } from '@react-navigation/compat'

function Table(props) {
    const { navigate } = props.navigation
    const RenderRow = (state) => {
        if (state.state !== 'Total') {
            return (
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ width: 400 }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={400}
                    decelerationRate="fast"
                    pagingEnabled
                    key={state.state}
                >
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text style={styles.stateStyle}
                                onPress={() => navigate('DistrictWise', { stateCode: state.statecode, name: state.state })}>
                                {state.state}</Text>
                        </View>

                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.tableText, marginLeft: 20 }}>
                                {formatNumber(state.confirmed)}
                                {state.deltaconfirmed > 0 ?
                                    <Text style={{ color: 'red' }}>{'\n'}&#8593;{formatNumber(state.deltaconfirmed)}</Text> : null}
                            </Text>
                        </View>
                        {/* 
                        <View style={styles.tableCell}>
                            <Text style={styles.tableText}>{formatNumber(state.active)}</Text>
                        </View> */}

                        <View style={styles.tableCell}>
                            <Text style={styles.tableText}>{formatNumber(state.recovered)}
                                {state.deltarecovered > 0 ?
                                    <Text style={{ color: 'green' }}>{'\n'}&#8593;{formatNumber(state.deltarecovered)}</Text> : null}
                            </Text>
                        </View>

                        <View style={styles.tableCell}>
                            <Text style={styles.tableText}>{formatNumber(state.deaths)}
                                {state.deltadeaths > 0 ?
                                    <Text style={{ color: 'gray' }}>{'\n'}&#8593;{formatNumber(state.deltadeaths)}</Text> : null}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
    const data = props.states
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
                        <Text style={styles.stateStyle}>
                            State/UT
                        </Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={{ ...styles.tableText, marginLeft: 20 }}>
                            Confirm
                            </Text>
                    </View>

                    {/* <View style={styles.tableCell}>
                        <Text style={styles.tableText}>Active</Text>
                    </View> */}

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>Recovered</Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>Deaths</Text>
                    </View>
                </View>
            </ScrollView>
            {data.map((state) => {
                return RenderRow(state)
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

export default withNavigation(Table)
