import { Modal, TouchableOpacity } from "react-native";
import * as React from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

const ModalView = styled.View`
  justify-content: center;
  align-self: center;
  margin-top: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  border-width: 1px;
  border-color: #F2A54A;
`

const Title = styled.Text`
  font-weight: 500;
  font-size: 15px;
`

const TextContent = styled.Text`
  color: #2F80ED;
  font-size: 15px;
  line-height: 30px;
`

const TextCancel = styled.Text`
  color: #F2A54A;
  font-size: 15px;
  text-align: right;
`

interface props {
  type: string
  data: Array<string>
  onPress: (text: string) => void
  setModalVisible
  modalVisible: boolean
}

export const ModalProfile = ({type, data, onPress, setModalVisible, modalVisible} : props ) => {

  const onCancel = useCallback(() => { setModalVisible(false) }, [])

  const title = useMemo(() => {
    if(type === 'email') return 'Choose email'
    return 'Choose Phone number'
  }, [])

  const onChoose = useCallback((item) => {
    onPress(item);
    setModalVisible(false)
  }, [])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>

      <ModalView>
        <Title>{title}</Title>

        {data.map((item, index) =>
          <TouchableOpacity onPress={() => onChoose(item)}>
            <TextContent>{item}</TextContent>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onCancel}>
          <TextCancel>Cancel</TextCancel>
        </TouchableOpacity>
      </ModalView>

    </Modal>
  )
}
