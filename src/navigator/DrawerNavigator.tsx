import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import TabNavigator from "./TabNavigator";
import CustomSidebarMenu from "./CustomSideBarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomSidebarMenu {...props}/>}>
      <Drawer.Screen name="Root" component={TabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
