import React from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { formatNumber } from '../utils/functions'
import { Loading } from './LoadingComponent'
import { connect } from 'react-redux'

function DistrictTable(props) {
    const RenderRow = (district) => {
        return (
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ width: 400 }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={400}
                decelerationRate="normal"
                key={district.district}
            >
                <View style={styles.tableRow}>
                    <View style={styles.tableCell}>
                        <Text style={styles.stateStyle}>
                            {district.district}</Text>
                    </View>
                    <View style={styles.tableCell}>
                        <Text style={{ ...styles.tableText, marginLeft: 20 }}>
                            {formatNumber(district.confirmed)}
                            {district.delta.confirmed > 0 ?
                                <Text style={{ color: 'red' }}>{'\n'}&#8593;{formatNumber(district.delta.confirmed)}</Text> : null}
                        </Text>
                    </View>
                    {/* 
                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>{formatNumber(district.active)}</Text>
                    </View> */}

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>{formatNumber(district.recovered)}
                            {district.delta.recovered > 0 ?
                                <Text style={{ color: 'green' }}>{'\n'}&#8593;{formatNumber(district.delta.recovered)}</Text> : null}
                        </Text>
                    </View>

                    <View style={styles.tableCell}>
                        <Text style={styles.tableText}>{formatNumber(district.deceased)}
                            {district.delta.deceased > 0 ?
                                <Text style={{ color: 'gray' }}>{'\n'}&#8593;{formatNumber(district.delta.deceased)}</Text> : null}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
    const data = props.district[0].districtData
    if (props.district[0].isLoading) {
        <Loading />
    }
    else {
        return (
            <View style={styles.table}>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={{ width: 400 }}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={400}
                    decelerationRate="fast"
                    pagingEnabled
                >
                    <View style={styles.tableRow}>

                        <View style={styles.tableCell}>
                            <Text style={styles.stateStyle}>District</Text>
                        </View>

                        <View style={styles.tableCell}>
                            <Text style={{ ...styles.tableText, marginLeft: 20 }}>Confirm</Text>
                        </View>
                        {/* 
                        <View style={styles.tableCell}>
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
                {data.map((district) => {
                    return RenderRow(district)
                })}
            </View>

        )
    }
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

const mapStateToProps = (state) => ({
    district: state.District
})

export default connect(mapStateToProps)(DistrictTable)
