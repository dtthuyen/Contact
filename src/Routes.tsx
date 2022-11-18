import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { memo, useCallback } from "react";
import { defaultScreenOptions, navigationRef } from "./utils/navigation";
import { CustomSidebarMenu } from "./screens/Drawer/CustomSideBarMenu";
import LoginScreen from "./screens/Login/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileContactScreen } from "./screens/Profile/ProfileContactScreen";
import { AddContactScreen } from "./screens/AddContact/AddContactScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./themes/Colors";
import { ICON_CONTACT, ICON_HISTORY } from "./assets";
import { ContactListScreen } from "./screens/Contacts/ContactListScreen";
import { HistoryScreen } from "./screens/History/HistoryScreen";
import styled from "styled-components";
import { BaseStyles } from "./themes/BaseStyles";

const RootStack = createStackNavigator();
const ModalStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const IconTab = styled.Image<{focused: boolean}>`
  width: 20px;
  height: 20px;
  tint-color: ${p => p.focused ? Colors.white : Colors.orange2}
`

const TabNavigator = () => {
  const { insets } = BaseStyles();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => (
        {
        headerShown: false,
        tabBarInactiveTintColor: Colors.orange2,
        tabBarActiveTintColor: Colors.white,
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
      }
      )}>
      <Tab.Screen name="Contacts" component={ContactListScreen}/>
      <Tab.Screen name="History" component={HistoryScreen}/>
    </Tab.Navigator>
  );
};

const DrawerStackComponent = memo(() => {
  return (
    <DrawerStack.Navigator
      initialRouteName={'Tabs'}
      screenOptions={{ headerShown: false }}
      drawerContent={() => <CustomSidebarMenu/> }
    >
      <DrawerStack.Screen name="Tabs" component={TabNavigator} />
    </DrawerStack.Navigator>
  )
})

const ModalStackComponent = memo(function ModalStackComponent() {
  return (
    <ModalStack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false}}
      >
      <RootStack.Screen name={'Login'} component={LoginScreen}/>
      <RootStack.Screen name={'Home'} component={DrawerStackComponent}/>
      <RootStack.Screen name={'ProfileContact'} component={ProfileContactScreen}/>
      <RootStack.Screen name={'AddContact'} component={AddContactScreen}/>
    </ModalStack.Navigator>
  );
});

export const Routes = memo(function Routes() {
  const routeNameRef = React.useRef<string>('');

  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    // @ts-ignore
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      // analytics().setCurrentScreen(currentRouteName);
      routeNameRef.current = currentRouteName;
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      <RootStack.Navigator initialRouteName={'Root'} screenOptions={{ headerShown: false }}>
        <RootStack.Screen name={'Root'} component={ModalStackComponent}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
});

export default Routes;

