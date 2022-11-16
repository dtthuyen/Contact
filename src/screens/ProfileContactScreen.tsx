import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import {
  IC_BACK,
  IC_btnCALL,
  IC_btnFACETIME,
  IC_btnMAIL,
  IC_btnMESS, ICON_InMail, ICON_UnPhone, ICON_UnSms, ICON_UnVideo,
  MASK_AVT
} from "../assets";
import { Alert, Linking } from "react-native";
import { InfoContact } from "../components/InfoContact";
import { useNavigation } from "@react-navigation/native";
import { Contact } from "../store/contact";
import { useContact, useListId } from "../store/reducer";
import { Header } from "../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { removeContact, SyncDataContacts } from "../store";
import Toast from "react-native-toast-message";
import { ActivityInProfile } from "../components/ActivityInProfile";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Section1 = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fffbf6;
  flex-direction: column;
`;

const ViewAvatar = styled.View`
  background-color: #F2F2F2;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`

const ImgAvt = styled.Image`
  width: 100px;
  height: 100px;
`;

const Name = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
`;

const Job = styled.Text`
  font-size: 13px;
  color: #828282;
  text-align: center;
`;

const ViewAct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 30px;
  padding: 0px 15px;
`;

const Section2 = styled.View`
`;

const Section3 = styled.View`
`;

const ViewNote = styled.View`
  margin: 22px 16px 8px 16px;
  height: 40px;
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
  padding-bottom: 8px;
  justify-content: flex-end;
`;

const TextNote = styled.Text`
  color: #333333;
  font-size: 13px;
  margin-bottom: 3px;
`;

const EditNote = styled.TextInput`
  font-size: 15px;
  width: 100%;
  color: #2F80ED;
`;

const ViewChoose = styled.TouchableOpacity`
  margin: 8px 16px;
  height: 34px;
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
  justify-content: center;
`;

const ChatText = styled.Text`
  font-size: 15px;
  color: #333333;
`;

const DeleteText = styled(ChatText)`
  color: #FF4A4A;
`;

export const ProfileContactScreen = ({ route } ) => {
  const navigation = useNavigation();
  const { idContact } = route.params;

  const listId = useListId("all")

  const onRemoveContact = useCallback(() => {
    Alert.alert("Xoá liên hệ", "Bạn có chắc chắn muốn xoá liên hệ?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          removeContact(idContact)
          navigation.navigate("Home");
        }
      }
    ]);
  }, []);

  const item: Contact | undefined = useContact(idContact);

  console.log('Profile:', item);

  const editInfo = useCallback(() => {
    navigation.navigate("AddContact", { screen: "edit info", _contact: item, idContact })
  }, [item])

  const [textNote, setTextNote] = useState<string>('')

  const note = useMemo(() => {
    let string = item?.note ? item?.note : ''
    if(textNote.length > 0) return textNote
    return string
  }, [item?.note, textNote])

  useEffect(() => {
    if (item) {
      const newItem = {
        ...item,
        note: note
      };
      SyncDataContacts([newItem], listId);
    }
  }, [note]);

  const pressLeft = useCallback(() => navigation.navigate('Home'), [])

  const showToast = useCallback((title) => {
    Toast.show({
      type: 'error',
      text1: title
    });
    console.log('show toast');
  },[])

  const onCall = useCallback(async () => {
    if(item.phone.length > 0)
      await Linking.openURL(`tel:${item?.phone[0]}`);
    else showToast('No phone number');
  }, [item.phone])

  const onMess = useCallback(async () => {
    if(item.phone.length > 0)
      await Linking.openURL(`sms:${item?.phone[0]}`);
    else showToast('No phone number');
  }, [item.phone])

  const onVideo = useCallback(async () => {
    if(item.phone.length > 0)
      await Linking.openURL(`tel:${item?.phone[0]}`);
    else showToast('No phone number');
  }, [item.phone])

  const onMail = useCallback(async () => {
    console.log(item.email);
    if(item.email.length > 0)
      await Linking.openURL(`mailto:${item?.email[0]}`);
    else showToast('No email');
  }, [item.email])

  return (
    <Container>
      <Header onPressLeft={pressLeft}
              onPressRight={editInfo}
              sourceLeft={IC_BACK}
              sourceRight='Sửa'
              type="profile"/>

      <Section1>
        <ViewAvatar>
          <ImgAvt source={item?.avt || MASK_AVT} />
        </ViewAvatar>

        <Name>{item?.value ?? "No Name"}</Name>
        <Job>Mobile Engineer</Job>

        <ViewAct>
          <ActivityInProfile type={'call'}
            data={item.phone}
            onPress={onCall}
            text={'Nhấn gọi điện'}
            srcActive={IC_btnCALL}
            srcInactive={ICON_UnPhone}/>
          <ActivityInProfile type={'mess'}
            data={item.phone}
            onPress={onMess}
            text={'Nhắn tin'}
            srcActive={IC_btnMESS}
            srcInactive={ICON_UnSms}/>
          <ActivityInProfile type={'video'}
            data={item.phone}
            onPress={onVideo}
            text={'Facetime'}
            srcActive={IC_btnFACETIME}
            srcInactive={ICON_UnVideo}/>
          <ActivityInProfile type={'email'}
            data={item.email}
            onPress={onMail}
            text={'Gửi mail'}
            srcActive={ICON_InMail}
            srcInactive={IC_btnMAIL}/>
        </ViewAct>
      </Section1>

      <KeyboardAwareScrollView>
        <Section2>
          <InfoContact type={"phone"} title={"Điện thoại"} data={item?.phone} />
          <InfoContact type={"email"} title={"Email"} data={item?.email} />
          <InfoContact type={"addr"} title={"Địa chỉ"} data={item?.addr} />
        </Section2>

        <Section3>
          <ViewNote>
            <TextNote>Ghi chú</TextNote>
            <EditNote onChangeText={setTextNote}>{item?.note}</EditNote>
          </ViewNote>
          <ViewChoose onPress={onMess}>
            <ChatText>Gửi tin nhắn</ChatText>
          </ViewChoose>
          <ViewChoose onPress={onRemoveContact}>
            <DeleteText>Xóa người gọi</DeleteText>
          </ViewChoose>
        </Section3>
      </KeyboardAwareScrollView>

      <Toast/>

    </Container>
  );
};
