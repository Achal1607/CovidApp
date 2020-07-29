import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import State from './StateComponent'
import Home from './HomeComponent'
import { Icon } from 'react-native-elements';
import DistrictComponent from './DistrictComponent';
import Graph from './GraphComponent';
import World from './WorldComponent';
import Country from './Country';

const Tab = createBottomTabNavigator()

const HomeStack = createStackNavigator()

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={Home}
                options={{
                    title: 'Dashboard India',
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',

                        fontSize: 20
                    },
                    headerTitleAlign: "center"
                }} />
        </HomeStack.Navigator>
    )
}

const StateStack = createStackNavigator()

function StateStackScreen() {
    return (
        <StateStack.Navigator initialRouteName="StateWise" >
            <StateStack.Screen name='StateWise' component={State}
                options={{
                    title: 'StateWise Status',
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',

                        fontSize: 20
                    },
                    headerTitleAlign: "center"

                }}
            />
            <StateStack.Screen name='DistrictWise' component={DistrictComponent}
                options={({ route }) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',

                        fontSize: 20
                    },
                    headerTitleAlign: "center"

                })}
            />
        </StateStack.Navigator>
    )
}

const GraphStack = createStackNavigator()

function GraphStackScreen() {
    return (
        <GraphStack.Navigator>
            <GraphStack.Screen name='Graph' component={Graph}
                options={{
                    title: 'Graphical Status India',
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20
                    },
                    headerTitleAlign: "center"
                }} />
        </GraphStack.Navigator>
    )
}

const WorldStack = createStackNavigator()

function WorldStackScreen() {
    return (
        <WorldStack.Navigator>
            <WorldStack.Screen name='World' component={World}
                options={{
                    title: 'World Stats',
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',

                        fontSize: 20
                    },
                    headerTitleAlign: "center"
                }} />
            <StateStack.Screen name='Country' component={Country}
                options={({ route }) => ({
                    title: route.params.name,
                    headerStyle: {
                        backgroundColor: '#181818',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',

                        fontSize: 20
                    },
                    headerTitleAlign: "center"

                })}
            />
        </WorldStack.Navigator>
    )
}

export const TabNavigation = () => (
    <Tab.Navigator
        screenOptions={({ route, TintColor }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName
                if (route.name === 'Home')
                    iconName = 'home'
                else if (route.name === 'StateWise') {
                    iconName = 'map-marker'
                }
                else if (route.name === 'World Stats') {
                    iconName = 'globe'
                }
                else {
                    iconName = 'line-chart'
                }
                return <Icon name={iconName} size={24} type='font-awesome' iconStyle={{ color: 'white' }} />
            }
        })}
        tabBarOptions={{
            activeTintColor: 'yellow',
            inactiveTintColor: 'white',
            activeBackgroundColor: '#2a2438',
            inactiveBackgroundColor: '#202060'
        }}
    >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="StateWise" component={StateStackScreen} />
        <Tab.Screen name="World Stats" component={WorldStackScreen} />
        <Tab.Screen name="Graphical" component={GraphStackScreen} />
    </Tab.Navigator >
)