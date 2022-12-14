import * as React from "react";
import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { ModalProfile } from "./ModalProfile";
import Toast from "react-native-toast-message";
import { Colors } from "../../../themes/Colors";
import useBoolean from "../../../hooks/useBoolean";

const View = styled.View`
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const Circle = styled.TouchableOpacity<{isActive: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${p => p.isActive ? Colors.backgroundColor : Colors.white };
  border-color: ${Colors.gray4};
  border-width: ${p => p.isActive ? 0 : 1 }px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text<{isActive: boolean }>`
  margin-top: 4px;
  font-size: 11px;
  color: ${p => p.isActive ? Colors.backgroundColor : Colors.gray4};
`;

const Icon = styled.Image<{isActive: boolean }>`
  tint-color: ${p => p.isActive ? Colors.white : Colors.gray4}
`;

interface props {
  type: string
  data: Array<string>;
  onPress: (text: string) => void;
  text: string;
  src: string
}

export const ActivityInProfile = ({ type, data, onPress, src, text } : props) => {
  const [modalVisible, setModalVisible, setModalInvisible] = useBoolean(false)

  const showToast = useCallback((title) => {
    Toast.show({
      type: 'error',
      text1: title
    });
  },[])

  const openModal = useCallback(() => {
    if(data.length > 1) setModalVisible()
    else if(data.length == 1) onPress(data[0])
    else {
      if(type === 'email') showToast('No email')
      else showToast('No phone number')
    }
  }, [data, type])

  const StyleIcon = useMemo(() => {
    if(type === 'call') return {
      width: 18,
      height: 18
    }
    if(type === 'mess') return {
      width: 24,
      height: 24
    }
    if(type === 'video') return {
      width: 18,
      height: 12
    }
    if(type === 'email') return {
      width: 24,
      height: 24
    }
  }, [type])

  const isActive = useMemo(() => {
    return data.length > 0
  },[data])

  return (
  <View>
    <ModalProfile
      type={type}
      data={data}
      onPress={onPress}
      setModalInvisible={setModalInvisible}
      modalVisible={modalVisible}/>

    <Circle isActive={isActive} onPress={openModal}>
      <Icon isActive={isActive} style={StyleIcon} source={src} />
    </Circle>
    <Text isActive={isActive}>{text}</Text>
  </View>

  )
}
