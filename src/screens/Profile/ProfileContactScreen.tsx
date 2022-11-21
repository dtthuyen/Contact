import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import {
  IC_BACK,
  IC_btnMAIL,
  ICON_UnPhone, ICON_UnSms, ICON_UnVideo,
  MASK_AVT
} from "../../assets";
import { Alert, Linking, View } from "react-native";
import { InfoContact } from "./components/InfoContact";
import { Contact } from "../../utils/contact";
import { Header } from "../../components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { ActivityInProfile } from "./components/ActivityInProfile";
import { ModalProfile } from "./components/ModalProfile";
import { navigateToAddContactScreen, navigateToHomeScreen } from "../../utils/navigation";
import { Colors } from "../../themes/Colors";
import { useNavigationParams } from "../../hooks/useNavigationParams";
import useBoolean from "../../hooks/useBoolean";
import { removeContact, syncDataContacts, syncToMyCompany, useContact, useListId } from "../../store/contacts";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Overview = styled.View`
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
  color: ${Colors.gray2};
  text-align: center;
`;

const ViewAct = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 25px;
  margin-bottom: 30px;
  padding: 0px 15px;
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
  color: ${Colors.gray1};
  font-size: 13px;
  margin-bottom: 3px;
`;

const EditNote = styled.TextInput`
  font-size: 15px;
  width: 100%;
  color: ${Colors.blue};
`;

const ViewChoose = styled.TouchableOpacity`
  margin: 8px 16px;
  height: 34px;
  border-bottom-width: 0.5px;
  border-color: ${Colors.grayBorder1};
  padding-bottom: 10px;
  justify-content: center;
`;

const ChatText = styled.Text`
  font-size: 15px;
  color: ${Colors.gray1};
`;

const DeleteText = styled(ChatText)`
  color: ${Colors.red1};
`;

export interface ProfileContactScreenProps {
  idContact: string
}

export const ProfileContactScreen = () => {
  const { idContact } = useNavigationParams<ProfileContactScreenProps>();

  const listId = useListId("all")
  const item: Contact | undefined = useContact(idContact);

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
          navigateToHomeScreen();
        }
      }
    ]);
  }, []);

  const editInfo = useCallback(() => {
    navigateToAddContactScreen({ _contact: item, idContact })
  }, [item, idContact])

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
      syncDataContacts([newItem], listId);
    }
  }, [note]);

  const onCall = useCallback(async (text) => {
    await Linking.openURL(`tel:${text}`);
  }, [item.phone])

  const onMess = useCallback(async (text) => {
    await Linking.openURL(`sms:${text}`);
  }, [item.phone])

  const onVideo = useCallback(async (text) => {
    await Linking.openURL(`tel:${text}`);
  }, [item.phone])

  const onMail = useCallback(async (text) => {
    await Linking.openURL(`mailto:${text}`);
  }, [item.email])

  const [modalVisible, setModalVisible, setModalInvisible] = useBoolean(false)

  const toggleModal = useCallback(() => {
    if(item.phone.length > 1) setModalVisible()
    else if(item.phone.length == 1) onMess(item.phone[0])
    else Toast.show({
      type: 'error',
      text1: 'No phone number'
    });
  }, [])

  const onSaveCompany = useCallback(() => {
    syncToMyCompany([idContact])
  }, [idContact])

  return (
    <Container>
      <Header onPressLeft={navigateToHomeScreen}
              onPressRight={editInfo}
              sourceLeft={IC_BACK}
              sourceRight='Sửa'
              type="profile"/>

      <Overview>
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
            src={ICON_UnPhone}/>
          <ActivityInProfile type={'mess'}
            data={item.phone}
            onPress={onMess}
            text={'Nhắn tin'}
            src={ICON_UnSms}/>
          <ActivityInProfile type={'video'}
            data={item.phone}
            onPress={onVideo}
            text={'Facetime'}
            src={ICON_UnVideo}/>
          <ActivityInProfile type={'email'}
            data={item.email}
            onPress={onMail}
            text={'Gửi mail'}
            src={IC_btnMAIL}/>
        </ViewAct>
      </Overview>

      <KeyboardAwareScrollView>
        <View>
          <InfoContact type={"phone"} title={"Điện thoại"} data={item?.phone} />
          <InfoContact type={"email"} title={"Email"} data={item?.email} />
          <InfoContact type={"addr"} title={"Địa chỉ"} data={item?.addr} />
        </View>

        <View>
          <ViewNote>
            <TextNote>Ghi chú</TextNote>
            <EditNote onChangeText={setTextNote}>{item?.note}</EditNote>
          </ViewNote>

          <ModalProfile
            type={'mess'}
            data={item.phone}
            onPress={onMess}
            setModalInvisible={setModalInvisible}
            modalVisible={modalVisible}/>
          <ViewChoose onPress={toggleModal}>
            <ChatText>Gửi tin nhắn</ChatText>
          </ViewChoose>

          <ViewChoose onPress={onRemoveContact}>
            <DeleteText>Xóa người gọi</DeleteText>
          </ViewChoose>
          <ViewChoose onPress={onSaveCompany}>
            <DeleteText>Save as my company </DeleteText>
          </ViewChoose>
        </View>
      </KeyboardAwareScrollView>

      <Toast/>

    </Container>
  );
};
