import * as React from 'react';
import styled from 'styled-components'
import {ICON_CALL, ICON_INFO_CALL} from '../assets/index'
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 64px;
  flex-direction: row;
`;

const ICType = styled.Image`
  width: 20px;
  height: 20px;
  margin-top: 12px;
  margin-left: 16px;
  margin-right: 17px;
`;

const InfoContact = styled.View`
  flex-direction: column;
`;

const TextName = styled.Text`
  font-size: 16px;
  color: black;
  letter-spacing: 0.12px;
  font-weight: 500;
`;

const TextPhone = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #828282;
  letter-spacing: 0.12px;
`;

const View2 = styled.View`
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const View = styled.View`
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  width: 86%;
  align-items: center;
  padding-right: 20px;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`

const TimePhone = styled.Text`
  color: #828282;
  font-size: 13px;
  text-align: right;
  margin-right: 29px;
`

const IconInfoPhone = styled.Image`
  width: 24px;
  height: 24px;
`

const HistoryForm = (props) => {
  return (
    <Container>
      <ICType source={ICON_CALL}/>

      <View>
        <InfoContact>
          <TextName>{props.name}</TextName>
          <TextPhone>{props.phone}</TextPhone>
        </InfoContact>

        <View2>
          <TimePhone>Hôm Nay</TimePhone>

          <TouchableOpacity>
            <IconInfoPhone source={ICON_INFO_CALL}/>
          </TouchableOpacity>
        </View2>
      </View>

    </Container>
  )
};

export default HistoryForm;
