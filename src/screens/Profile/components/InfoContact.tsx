import styled from "styled-components";
import * as React from "react";
import  { useCallback } from "react";
import { Linking } from "react-native";
import { Colors } from "../../../themes/Colors";

const Container = styled.View`
  width: 100%;
  padding: 0px 16px;
`
const View = styled.View`
  width: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.grayBorder1} ;
  margin-top: 15px;
  padding-bottom: 8px;
`

const TouchText = styled.TouchableOpacity`
`

const Text = styled.Text`
  font-size: 13px;
  color: ${Colors.gray1};
  letter-spacing: -0.41px;
  line-height: 22px;
`

const Content = styled.Text`
  font-size: 17px;
  color: ${Colors.blue};
  line-height: 22px;
  margin-top: 5px;
`

interface Props {
  key?: string;
  type: string;
  title: string;
  data?: Array<string>
}

export const InfoContact = ({ key, type, title, data } : Props) => {
  const onPress = useCallback(async (text) => {
    if(type === 'phone') await Linking.openURL(`tel:${text}`);
    if(type === 'email') await Linking.openURL(`mailto:${text}`);
  }, [])

  return (
      <Container>
        <View title={title}>
          <Text>{title}</Text>

          {data?.map((item, index) =>
             type === 'addr'
              ? <Content key={index}>{item}</Content>
              : <TouchText key={index} onPress={() => onPress(item)}>
                  <Content>{item}</Content>
                </TouchText>
          )}

        </View>
      </Container>
  )

}
