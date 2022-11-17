import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { ContactListScreen } from "../screens/ContactListScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { ICON_CONTACT, ICON_HISTORY } from "../assets";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useCallback, useMemo } from "react";
import { Colors } from "../themes/Colors";

const Tab = createBottomTabNavigator();

const IconTab = styled.Image<{focused: boolean}>`
  width: 20px;
  height: 20px;
  tint-color: ${p => p.focused ? '#fff' : '#FFDAAE'}
`

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: '#FFDAAE',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: Colors.backgroundColor,
          paddingBottom: insets.bottom,
          height: 84
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'Contacts') {
            return <IconTab focused={focused} source={ICON_CONTACT}/>;
          } else if (route.name === 'History') {
            return <IconTab focused={focused} source={ICON_HISTORY}/>;
          }
        },
        title: route.name === 'Contacts' ? "Danh bạ" : "Gần đây"
      })}>
      <Tab.Screen name="Contacts" component={ContactListScreen}/>
      <Tab.Screen name="History" component={HistoryScreen}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({

})
