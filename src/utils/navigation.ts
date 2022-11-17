import { TransitionPresets } from "@react-navigation/stack";
import * as React from "react";
import {
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const defaultScreenOptions = TransitionPresets.SlideFromRightIOS;

export const navigationRef = React.createRef<NavigationContainerRef>()

export const navigation = () => navigationRef.current!;

export const createNavigate = <T extends object>(screenName: string) => (param?: T) => {
  return navigation().navigate(screenName, param)
}

export const createPush = <T extends object>(screenName: string) => (params: T) => {
  return navigation().dispatch(StackActions.replace(screenName, params))
}

export const createReplace = <T extends object>(screenName: string) => (
  params?: T,
) => {
  return navigation().dispatch(StackActions.replace(screenName, params))
};

export const goBack = () => navigation().goBack()

export const toggleDrawer = () => navigation().toggleDrawer()

export const navigateToAddContactScreen = createNavigate('AddContact')

export const navigateToProfileContactScreen = createNavigate('ProfileContact')

export const navigateToContactListScreen = createNavigate('Contacts')

export const navigateToHomeScreen = createNavigate('Home')


