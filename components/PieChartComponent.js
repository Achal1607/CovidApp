import React from 'react'
import { connect } from 'react-redux'
import { PieChart } from 'react-native-svg-charts'
import { View, Text } from 'react-native'

function Pie(props) {
    const { totaldeceased, totalrecovered } = props.stats
    const data = [parseInt(props.totalactive), parseInt(totaldeceased), parseInt(totalrecovered)]
    const color = ['#8A2BE2', '#D2691E', '#7FFF00']
    const pieData = data
        .filter(value => value > 0)
        .map((value, index) => ({
            value: value,
            svg: {
                fill: color[index],
                onPress: () => console.log('press', index)
            },
            key: 'pie-' + index,
        }))
    return (
        <View style={{ flexDirection: 'row' }}>
            <PieChart style={{ height: 200, width: 200 }} data={pieData} animate={true} animationDuration={3000} />
            <View style={{ flexDirection: 'column', marginTop: 'auto', marginBottom: 'auto', marginLeft: 40 }}>
                <Text style={{ color: '#8A2BE2', fontWeight: 'bold', fontSize: 15 }}>
                    <View style={{ height: 15, width: 15, backgroundColor: '#8A2BE2', marginRight: 6 }}></View>
                    {'  Active'}
                </Text>
                <Text style={{ color: '#7FFF00', fontWeight: 'bold', fontSize: 15 }}>
                    <View style={{ height: 15, width: 15, backgroundColor: '#7FFF00', marginRight: 6 }}></View>
                    {'  Recovered'}
                </Text>
                <Text style={{ color: '#D2691E', fontWeight: 'bold', fontSize: 15 }}>
                    <View style={{ height: 15, width: 15, backgroundColor: '#D2691E', marginRight: 6 }}></View>
                    {'  Deceased'}
                </Text>
            </View>
        </View>
    )
}

const mapStateToProps = (state) => ({
    stats: state.Reducer
})

export default connect(mapStateToProps)(Pie)
