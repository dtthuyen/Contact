import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchImageLibrary } from "react-native-image-picker";
import { Alert, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
// @ts-ignore
import moment from "moment";

import { IC_CAMERA_ADD_AVT, ICON_ADD, ICON_DEL, MASK_AVT } from "../../assets";
import { AddInfoForm } from "./AddInfoForm";
import { Contact } from "../../utils/contact";
import { syncDataContacts, useListId } from "../../store";
import { Header } from "../../components/Header";
import _ from "lodash";
import { goBack, navigateToContactListScreen, navigateToProfileContactScreen } from "../../utils/navigation";
import { Colors } from "../../themes/Colors";
import { useNavigationParams } from "../../hooks/useNavigationParams";
import useBoolean from "../../hooks/useBoolean";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
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
  background-color: ${Colors.gray6};
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
  border-color: ${Colors.grayBorder1};
  justify-content: flex-end;
  padding-bottom: 11px;
`;

const InputInfo = styled.TextInput`
  width: 100%;
  font-size: 15px;
  color: ${Colors.gray1};
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
  border-color: ${Colors.grayBorder1};
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
  color: ${Colors.gray1};
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
  color: ${p => p.isNull ? Colors.blue : Colors.gray3};
  font-size: 15px;
  margin-left: 16px;
  width: 100%;
`;

export interface AddContactScreenProps {
  _contact?: Contact;
  idContact?: string;
}

export const AddContactScreen = () => {
  const [change, setChange, setNoChange] = useBoolean();

  const { _contact, idContact } = useNavigationParams<AddContactScreenProps>() || {};

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
  }, [item]);

  const ChangeAvt = useMemo(() => {
    return <ImgAvt source={pathAvt} />;
  }, [pathAvt]);

  const [openPicker, setOpenPicker, setClosePicker] = useBoolean(false)
  const [dateString, setDateString] = useState<string>("");
  const [birthday, setBirthday] = useState<string>();

  useEffect(() => {
    if (item.birthday) {
      setBirthday(item.birthday);
    }
  }, [item.birthday]);

  const onConfirm = (date: any) => {
    setClosePicker();
    setDateString(moment(date).format("DD/MM/YYYY"));
  };

  const onCancelDate = useCallback(() => {
    setClosePicker();
  }, []);

  const onAddDate = useCallback(() => {
    setBirthday("");
    setOpenDatePicker();
  }, []);

  const onDelDate = useCallback(() => {
    setDateString("");
    setBirthday(undefined);
  }, []);

  const setOpenDatePicker = useCallback(() => {
    setOpenPicker();
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
    );
  }, [getBirthday, hasBirthday]);

  const onHandleAddContact = useCallback(() => {
    if (item) {
      const newItem = {
        ...item,
        value: item.firstname.trim().concat(" ", item.lastname.trim()).trim(),
        avt: pathAvt,
        birthday: getBirthday
      };
      console.log(">>>>>Add/Edit Contact: ", newItem);

      // co it nhat ten/sdt/email moi luu
      if (newItem.phone.length > 0 || newItem.email.length > 0 || newItem.value.trim().length > 0) {
        syncDataContacts([newItem], listId);
        // navigation.navigate("ProfileContact", { idContact: newItem.id });
        navigateToProfileContactScreen({ idContact: newItem.id });
      } else navigateToContactListScreen();
    }
  }, [item, listId, pathAvt, getBirthday]);

  const changeData = useCallback((type) => {
    return !_.isEqual(item[type], _contact[type]);
  }, [item, _contact]);

  useEffect(() => {
    if (_contact) {
      if (pathAvt !== _contact.avt || getBirthday !== _contact.birthday
        || item.firstname !== _contact.firstname || item.lastname !== _contact.lastname
        || item.company !== _contact.company || changeData("phone")
        || changeData("email") || changeData("addr")) setChange();
      else setNoChange();
    } else {
      if (item.phone.length || item.email.length
        || item.addr.length || item.firstname.length
        || item.lastname.length || item.company.length
        || getBirthday.length) setChange();
      else setNoChange();
    }
  }, [item, _contact, getBirthday, pathAvt]);

  return (
    <Container>
      <Header
        onPressLeft={goBack}
        onPressRight={onHandleAddContact}
        sourceLeft="Hủy"
        sourceRight="Xong"
        type="addContact"
        isChange={change} />

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
            <InputInfo placeholder="Họ"
                       value={item.firstname}
                       onChangeText={text => onChange("firstname", text)}
            />
          </EditInfo>
          <EditInfo>
            <InputInfo placeholder="Tên"
                       value={item.lastname}
                       onChangeText={text => onChange("lastname", text)}
            />
          </EditInfo>
          <EditInfo>
            <InputInfo placeholder="Công ty"
                       onChangeText={text => onChange("company", text)}
                       value={item.company}
            />
          </EditInfo>
        </EditInfoView>

        <MoreInfo>
          <AddInfoForm
            type={"phone"}
            text={"thêm số điện thoại"}
            hintText={"số điện thoại"}
            dataList={_contact?.phone || []}
            setInfo={onChange}/>
          <AddInfoForm
            type={"email"}
            text={"thêm email"}
            hintText={"email"}
            dataList={_contact?.email || []}
            setInfo={onChange}/>
          <AddInfoForm
            type={"addr"}
            text={"thêm địa chỉ"}
            hintText={"địa chỉ"}
            dataList={_contact?.addr || []}
            setInfo={onChange} />

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
