import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components/native";
import { Header } from "../components/Header";
import ContactForm from "../components/ContactForm";
import { ICON_CAMERA, ICON_MENU, ICON_SEARCH } from "../assets";
import { AlphabetList, DEFAULT_CHAR_INDEX } from "react-native-section-alphabet-list";
import { useNavigation } from "@react-navigation/native";
import { useContactsByKeyValue } from "../store";
import { StyleSheet } from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const ViewSearch = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 8px;
  background-color: white;
`;

const SearchView = styled.View`
  align-items: center;
  width: 100%;
  background-color: #f8f8f8;
  flex-direction: row;
  border-radius: 6px;
`;

const IconSearch = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 10px;
`;

const EditTextSearch = styled.TextInput`
  font-size: 13px;
  height: 36px;
  margin-left: 5px;
  width: 100%;
`;

const ListView = styled.View`
  flex: 1;
  background-color: white;
`;

const AlphabetView = styled.View`
  background-color: #EfEfEf;
  width: 100%;
  height: 36px;
  justify-content: center;
  padding: 0px 16px;
`;

const TextSection = styled.Text`
  color: #333333;
  font-weight: bold;
`

export const ContactListScreen = () => {
  const navigation = useNavigation();
  const [text,setText] = useState('')

  const contactsByKeyValue = useContactsByKeyValue();

  const contacts = useMemo(() => {
    let list = contactsByKeyValue
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      list = list.filter(
        function(item: any) {
          // Applying filter for the inserted text in search bar
          const itemData = item.value
            ? item.value.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
    }
    return list
  },[text, contactsByKeyValue])

  const onPressRight = useCallback(() => {
    navigation.navigate("AddContact", { screen: "add new contact" });
  }, []);

  const renderCustomItem = useCallback((item) => (
    <ContactForm idContact={item.key} />
  ), [])

  const renderCustomSectionHeader = useCallback((section) => (
    <AlphabetView>
      <TextSection >{section.title}</TextSection>
    </AlphabetView>
  ), [])

  return (
    <Container>
      <Header
        title={"Liên hệ"}
        onPressLeft={navigation.toggleDrawer}
        onPressRight={onPressRight}
        sourceLeft={ICON_MENU}
        sourceRight={ICON_CAMERA}
      />

      <ViewSearch>
        <SearchView>
          <IconSearch source={ICON_SEARCH} />
          <EditTextSearch placeholder="Tìm kiếm danh bạ" onChangeText={setText} />
        </SearchView>
      </ViewSearch>

      {/*<KeyboardAwareScrollView>*/}
        <ListView>
          <AlphabetList
            data={contacts}
            index={DEFAULT_CHAR_INDEX}
            indexLetterStyle={style.indexLetterStyle}
            indexLetterContainerStyle={style.indexLetterContainerStyle}
            indexContainerStyle={style.indexContainerStyle}
            renderCustomItem={(item) =>  renderCustomItem(item)}
            renderCustomSectionHeader={(section) => renderCustomSectionHeader(section)}
          />
        </ListView>
      {/*</KeyboardAwareScrollView>*/}


    </Container>
  );
};

const style = StyleSheet.create({
  indexLetterStyle: {
    color: "#F2A54A",
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase"
  },
  indexLetterContainerStyle: {
  marginBottom: 10
  },
  indexContainerStyle: {
    margin: 7,
    width: 20,
    alignItems: "center",
    position: "absolute"
  }
})
