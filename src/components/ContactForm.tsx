import * as React from "react";
import { useCallback } from "react";
import styled from 'styled-components'
import { MASK_AVT } from "../assets";
import { useNavigation } from "@react-navigation/native";
import { Contact } from "../store/contact";
import { useContact } from "../store/reducer";

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  padding: 0px 16px;
`;

const Body = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding-top: 10px;
`;

const ViewAvatar = styled.View`
  background-color: #F2F2F2;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
`

const IMGContact = styled.Image`
  width: 40px;
  height: 40px;
`;

const InfoView = styled.View`
  width: 94%;
  padding-right: 30px;
  padding-left: 16px;
`

const Info = styled.View`
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-bottom-width: 0.5px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;

const TextName = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: 500;
  letter-spacing: 0.12px;
`;

const TextPhone = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: #828282;
  letter-spacing: 0.12px;
  font-weight: 400;
  line-height: 16px;
`;

interface Props {
  idContact: string
}

const ContactForm = ({idContact} : Props) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('ProfileContact', {idContact})
  } ,[])

  const contact: Contact | undefined = useContact(idContact);
  return (
  <Container onPress={onPress}>
    <Body>
      <ViewAvatar>
        <IMGContact source={contact?.avt || MASK_AVT}/>
      </ViewAvatar>

      <InfoView>
        <Info>
          <TextName>{contact?.value || 'no name'}</TextName>
          <TextPhone>{contact?.phone[0] || 'no phone'}</TextPhone>
        </Info>
      </InfoView>
    </Body>
  </Container>
  )
};

export default ContactForm;
