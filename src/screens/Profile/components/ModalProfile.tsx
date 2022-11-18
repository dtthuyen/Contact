import { TouchableOpacity } from "react-native";
import * as React from "react";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import Modal from 'react-native-modal'
import { Colors } from "../../../themes/Colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const ModalView = styled.View`
  justify-content: center;
  background-color: ${Colors.orange1};
  padding: 25px;
  width: 80%;
  border-radius: 8px;
`

const Title = styled.Text`
  font-weight: 500;
  font-size: 15px;
  line-height: 35px;
`

const TextContent = styled.Text`
  color: ${Colors.blue};
  font-size: 15px;
  line-height: 30px;
`

const TextCancel = styled.Text`
  color: ${Colors.backgroundColor};
  font-size: 15px;
  text-align: right;
  line-height: 30px;
  font-weight: 500;
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
      isVisible={modalVisible}>

      <Container>
        <ModalView>
          <Title>{title}</Title>

          {data.map((item, index) =>
            <TouchableOpacity key={index} onPress={() => onChoose(item)}>
              <TextContent>{item}</TextContent>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onCancel}>
            <TextCancel>Cancel</TextCancel>
          </TouchableOpacity>
        </ModalView>
      </Container>

    </Modal>

  )
}
