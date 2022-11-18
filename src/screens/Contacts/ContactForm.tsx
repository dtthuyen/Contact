import * as React from "react";
import { useCallback } from "react";
import styled from 'styled-components'
import { MASK_AVT } from "../../assets";
import { useNavigation } from "@react-navigation/native";
import { Contact } from "../../utils/contact";
import { useContact } from "../../store";
import { Colors } from "../../themes/Colors";
import { navigateToProfileContactScreen } from "../../utils/navigation";

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 64px;
  padding-left: 16px;
`;

const Body = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  padding-top: 10px;
`;

const ViewAvatar = styled.View`
  background-color: ${Colors.gray7};
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
  border-bottom-color: ${Colors.grayBorder1};
`;

const TextName = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  font-weight: 500;
  letter-spacing: 0.12px;
`;

const TextPhone = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.gray2};
  letter-spacing: 0.12px;
  font-weight: 400;
  line-height: 16px;
`;

interface Props {
  idContact: string
}

const ContactForm = ({idContact} : Props) => {
  const onPress = useCallback(() => {
    navigateToProfileContactScreen({idContact})
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
