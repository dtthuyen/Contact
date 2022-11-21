import * as React from 'react';
import {
  NavigationContainerRef,
  StackActions,
  DrawerActions
} from '@react-navigation/native';

import { ProfileContactScreenProps } from "../screens/Profile/ProfileContactScreen";
import { TransitionPresets } from "@react-navigation/stack";
import { AddContactScreenProps } from "../screens/AddContact/AddContactScreen";

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

// @ts-ignore
export const navigationRef = React.createRef<NavigationContainerRef>();

export const navigation = () => navigationRef.current!;

export const createNavigate = <T extends object>(screen: string) => (params?: T) => {
  console.log(screen, params);
  return navigation().navigate(screen, params);
};

export const goBack = () => navigation().goBack();

export const toggleDrawer = () => navigation().dispatch(DrawerActions.toggleDrawer())

export const navigateToAddContactScreen = createNavigate<AddContactScreenProps>('AddContact')

export const navigateToProfileContactScreen = createNavigate<ProfileContactScreenProps>('ProfileContact')

export const navigateToContactListScreen = createNavigate('Contacts')

export const navigateToHomeScreen = createNavigate('Home')


