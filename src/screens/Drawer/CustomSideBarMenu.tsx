import * as React from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { IC_ADD_NEW, IC_MORE, IMG_avtAdmin } from "../../assets";
import styled from "styled-components";
import { ItemSideBar } from "./ItemSideBar";
import { Colors } from "../../themes/Colors";
import { BaseStyles } from "../../themes/BaseStyles";

const Container = styled.View`
  flex: 1;
`;

const InfoView = styled.View`
  background-color: ${Colors.backgroundColor};
  //height: 85px;
  flex-direction: row;
  padding: 23px 12px 13px 12px;
  align-items: flex-end;
`;

const ImgAvt = styled.Image`
  width: 40px;
  height: 40px;
`;

const TextView = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;

const TextName = styled.Text`
  font-size: 16px;
  color: ${Colors.white};
  font-weight: bold;
`;

const TextJob = styled.Text`
  margin-top: 5px;
  color: ${Colors.white};
  font-size: 12px;
`;

const ItemView = styled.TouchableOpacity`
  height: 44px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const NewView = styled(ItemView)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Icon = styled.Image`
  height: 20px;
  width: 20px;
  margin-bottom: 2px;
`;

const TextItem = styled.Text`
  font-size: 15px;
  color: ${Colors.gray1};
  margin-left: 20px;
`;

const TextCollection = styled(TextItem)`
  color: ${Colors.gray1};
  margin-left: 20px;
  font-size: 13px;
  font-weight: 700;
`;

const IconCollection = styled.Image`
  height: 5px;
  width: 10px;
`;

const CollectionView = styled.View`
  background-color: ${Colors.orange3};
  justify-content: space-between;
  align-items: center;
  height: 44px;
  width: 100%;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
`;

const View = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const EditText = styled.Text`
  font-size: 13px;
  color: ${Colors.backgroundColor};
  align-self: flex-end;
  font-weight: 500;
`;

const ViewShow = styled.View`
  width: 100%;
  flex-direction: column;
`;

export const CustomSidebarMenu = memo(() => {
  const {paddingTopInsets} = BaseStyles();

  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const onPress = useCallback(() => {
    setShow(!show);
  }, [show]);

  const textEdit = useMemo(() => {
    return edit ? "OK" : "Edit";
  }, [edit]);

  const onEdit = useCallback(() => {
    setEdit(!edit);
  }, [edit]);

  return (
    <Container>
      <InfoView style={paddingTopInsets}>
        <ImgAvt source={IMG_avtAdmin} />
        <TextView>
          <TextName>Nguyễn Tiến Nam</TextName>
          <TextJob>Admin Admin</TextJob>
        </TextView>
      </InfoView>

      <ScrollView>
        <NewView>
          <Icon source={IC_ADD_NEW} />
          <TextItem>New Collection</TextItem>
        </NewView>

        <CollectionView>
          <View onPress={onPress}>
            <IconCollection source={IC_MORE} />
            <TextCollection>COLLECTION</TextCollection>
          </View>

          <TouchableOpacity onPress={onEdit}>
            <EditText>{textEdit}</EditText>
          </TouchableOpacity>
        </CollectionView>

        <ViewShow>
          <ItemSideBar text="All" edit={edit} />
          <ItemSideBar text="General" edit={edit} />
          <ItemSideBar text="Investors" edit={edit} />
          <ItemSideBar text="Lead" edit={edit} />
          <ItemSideBar text="VIP" edit={edit} />
        </ViewShow>

      </ScrollView>
    </Container>
  );
});
