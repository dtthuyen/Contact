import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchImageLibrary } from "react-native-image-picker";
import { Alert, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment";

import { IC_CAMERA_ADD_AVT, ICON_ADD, ICON_DEL, MASK_AVT } from "../assets";
import { AddInfoForm } from "../components/AddInfoForm";
import { Contact } from "../store/contact";
import { useNavigation } from "@react-navigation/native";
import { useListId } from "../store/reducer";
import { Header } from "../components/Header";
import { SyncDataContacts } from "../store";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ViewAvt = styled.View`
  width: 100%;
  height: 135px;
  justify-content: center;
  align-items: center;
`;

const AddAvt = styled.View`
  height: 100%;
  width: 100px;
  justify-content: flex-end;
  align-items: center;
`;

const CircleAvt = styled.View`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #F2F2F2;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ImgAvt = styled.Image`
  width: 100px;
  height: 100px;
`;

const BtnAddAvt = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-self: flex-end;
`;

const ImgAddAvt = styled.Image`
  width: 30px;
  height: 30px;
`;

const EditInfoView = styled.View`
  margin-top: 15px;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

const EditInfo = styled.View`
  height: 48px;
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
  justify-content: flex-end;
  padding-bottom: 11px;
`;

const EditFirstName = styled.TextInput`
  width: 100%;
  font-size: 15px;
  color: #333333;
`;

const EditLastName = styled(EditFirstName)`
`;

const EditCompany = styled(EditFirstName)`
`;

const MoreInfo = styled.View`
  flex: 2.5;
  padding-left: 16px;
  padding-right: 16px;
`;

const AddView = styled.View`
  width: 100%;
  height: 44px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`;

const AddInfoView = styled(AddView)`
`;

const IconAdd = styled.Image`
  width: 24px;
  height: 24px;
`;

const TextAdd = styled.Text`
  font-size: 15px;
  color: #333333;
  margin-left: 16px;
`;

const ViewPickDate = styled.View`
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
`;

const TouchDate = styled.TouchableOpacity`
  width: 100%;
`;

const TextDate = styled.Text<{ isNull: boolean }>`
  color: ${p => p.isNull ? "#2F80ED" : "#BDBDBD"};
  font-size: 15px;
  margin-left: 16px;
  width: 100%;
`;

export const AddContactScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isChange, setIsChange] = useState<boolean>(false);

  const setChange = useCallback(() => {
    setIsChange(true);
  }, []);

  const props = route.params;
  const { _contact, idContact } = props || {};

  const listId = useListId("all");

  const [item, setItem] = useState<Contact>({
    value: "",
    id: new Date().getTime().toString() + Math.random(),
    firstname: "",
    lastname: "",
    company: "",
    phone: [],
    email: [],
    addr: [],
    birthday: "",
    note: ""
  });

  useEffect(() => {
    if (_contact) {
      setItem(_contact);
    }
  }, [_contact]);

  const [filePath, setFilePath] = useState<any>({ assets: [] });

  const chooseFile = useCallback(() => {
    launchImageLibrary({
        mediaType: "photo",
        maxWidth: 100,
        maxHeight: 100,
        quality: 1
      },
      (response) => {
        // console.log("Response = ", response);

        if (response.didCancel) {
          // Alert.alert("User cancelled camera picker");
          return;
        } else if (response.errorCode == "camera_unavailable") {
          Alert.alert("Camera not available on device");
          return;
        } else if (response.errorCode == "permission") {
          Alert.alert("Permission not satisfied");
          return;
        } else if (response.errorCode == "others") {
          Alert.alert(response.errorMessage || "response.errorMessage");
          return;
        }
        setFilePath(response);
      });
  }, []);

  const pathAvt = useMemo(() => {
    let path = item.avt ? item.avt : MASK_AVT;

    if (filePath && filePath.assets.length) path = { uri: filePath.assets[0].uri };
    return path;
  }, [item.avt, filePath]);

  const onChange = useCallback((type: string, data: any) => {
    const newItem = {
      ...item,
      [type]: data
    };
    setItem(newItem);
    setChange();
  }, [item]);

  const ChangeAvt = useMemo(() => {
    return <ImgAvt source={pathAvt} />;
  }, [pathAvt]);

  const onCancel = useCallback(() => {
    navigation.goBack();
  }, []);

  const [openPicker, setOpenPicker] = useState(false);
  const [dateString, setDateString] = useState<string>("");
  const [birthday, setBirthday] = useState<string>();

  useEffect(() => {
    if (item.birthday) {
      setBirthday(item.birthday);
    }
  }, [item.birthday]);

  const onConfirm = (date: any) => {
    setOpenPicker(false);
    setDateString(moment(date).format("DD/MM/YYYY"));
    setChange();
  };

  const onCancelDate = useCallback(() => {
    setOpenPicker(false);
  }, []);

  const onAddDate = useCallback(() => {
    setBirthday("");
    setOpenDatePicker();
    setChange();
  }, []);

  const onDelDate = useCallback(() => {
    setDateString("");
    setBirthday();
    setChange();
  }, []);

  const setOpenDatePicker = useCallback(() => {
    setOpenPicker(true);
  }, []);

  const getBirthday = useMemo(() => {
    let string = birthday ? birthday : "";
    if (dateString.length > 0) return dateString;
    return string;
  }, [dateString, birthday]);

  const hasBirthday = useMemo(() => {
    return getBirthday.length > 0;
  }, [getBirthday]);

  const TextDateString = useMemo(() => {
    return (
      <TouchDate onPress={setOpenDatePicker}>
        <TextDate isNull={hasBirthday}>{hasBirthday ? getBirthday : "ngày sinh"}</TextDate>
      </TouchDate>
    )}, [getBirthday]);

  const onHandleAddContact = useCallback(() => {
    if (item) {
      const newItem = {
        ...item,
        value: item.firstname.trim() + " " + item.lastname.trim(),
        avt: pathAvt,
        birthday: getBirthday
      };
      console.log(">>>>>Add/Edit Contact: ", newItem);

      // co it nhat ten/sdt/email moi luu
      if(newItem.phone.length > 0 || newItem.email.length > 0 || newItem.value.trim().length > 0) {
        SyncDataContacts([newItem], listId);
        navigation.navigate("ProfileContact", { idContact: newItem.id });
      } else navigation.navigate("Contacts");
    }
  }, [item, listId, pathAvt, getBirthday]);


  return (
    <Container>
      <Header
        onPressLeft={onCancel}
        onPressRight={onHandleAddContact}
        sourceLeft="Hủy"
        sourceRight="Xong"
        type="addContact"
        isChange={isChange} />

      <KeyboardAwareScrollView keyboardShouldPersistTaps={"always"}>
        <ViewAvt>
          <AddAvt>
            <CircleAvt>{ChangeAvt}</CircleAvt>
            <BtnAddAvt onPress={chooseFile}>
              <ImgAddAvt source={IC_CAMERA_ADD_AVT} />
            </BtnAddAvt>
          </AddAvt>
        </ViewAvt>

        <EditInfoView>
          <EditInfo>
            <EditFirstName placeholder="Họ"
                           onChangeText={text => onChange("firstname", text)}
            >{item.firstname}</EditFirstName>
          </EditInfo>
          <EditInfo>
            <EditLastName placeholder="Tên"
                          onChangeText={text => onChange("lastname", text)}
            >{item.lastname}</EditLastName>
          </EditInfo>
          <EditInfo>
            <EditCompany placeholder="Công ty"
                         onChangeText={text => onChange("company", text)}
            >{item.company}</EditCompany>
          </EditInfo>
        </EditInfoView>

        <MoreInfo>
          <AddInfoForm
            type={"phone"}
            text={"thêm số điện thoại"}
            hintText={"số điện thoại"}
            dataList={_contact?.phone}
            setInfo={onChange}
            setChange={setChange} />
          <AddInfoForm
            type={"email"}
            text={"thêm email"}
            hintText={"email"}
            dataList={_contact?.email}
            setInfo={onChange}
            setChange={setChange} />
          <AddInfoForm
            type={"addr"}
            text={"thêm địa chỉ"}
            hintText={"địa chỉ"}
            dataList={_contact?.addr}
            setInfo={onChange}
            setChange={setChange} />

          <ViewPickDate>
            {typeof birthday === "string" ?
              <AddInfoView>
                <TouchableOpacity onPress={onDelDate}>
                  <IconAdd source={ICON_DEL} />
                </TouchableOpacity>
                {TextDateString}
                <DatePicker
                  modal
                  open={openPicker}
                  date={new Date()}
                  mode={"date"}
                  onConfirm={(date) => onConfirm(date)}
                  onCancel={onCancelDate}
                />
              </AddInfoView>
              : null
            }

            <TouchableOpacity onPress={onAddDate}>
              <AddView>
                <IconAdd source={ICON_ADD} />
                <TextAdd>thêm ngày sinh</TextAdd>
              </AddView>
            </TouchableOpacity>
          </ViewPickDate>

        </MoreInfo>
      </KeyboardAwareScrollView>


    </Container>
  );
};
