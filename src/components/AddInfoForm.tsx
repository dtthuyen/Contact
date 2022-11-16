import styled from "styled-components";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ICON_ADD, ICON_DEL } from "../assets";
import { TouchableOpacity } from "react-native";

const Container = styled.View`
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
`;

const AddView = styled.View`
  width: 100%;
  height: 44px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.1);
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

const IconDel = styled(IconAdd)``;

const TextContent = styled.TextInput`
  color: #2F80ED;
  font-size: 15px;
  margin-left: 16px;
  width: 100%;
`;

interface Props {
  screen: string;
  type: string;
  dataList?: Array<string>;
  hintText: string;
  text: string;
  setInfo: (type: string, data: Array<string>) => void;
  setChange: () => void;
}

export const AddInfoForm = (({ screen, type, dataList, hintText, text, setInfo, setChange }: Props) => {
  const [list, setList] = useState<Array<{ id: string, data: any }>>([]);

  useEffect(() => {
    if (!dataList || !dataList.length) {
      setList([]);
    } else {
      const newItems = dataList.map((_item, index) => ({
        id: new Date().getTime().toString() + index.toString() + Math.random(),
        data: _item
      }));
      setList(newItems);
    }
  }, [dataList]);

  useEffect(() => {
    if (list.length) {
      const newItems = list.map(item => item.data);
      setInfo(type, newItems.filter(Boolean));
    } else
      setInfo(type, []);
  }, [list]);

  const onChangeText = useCallback(
    (text: string, id: string) => {
      setChange();
      setList(prevItems =>
        prevItems.map(item => {
          if (item.id === id) {
            item.data = text;
          }
          return item;
        })
      );
    }, [type]);

  const onAddNewItem = useCallback(() => {
    setList(prevItems =>
      prevItems.concat([
        {
          id: new Date().getTime().toString() + Math.random(),
          data: ""
        }
      ])
    );
  }, []);

  const onRemoveItem = useCallback(
    (id: string) => {
      setList(prevItems => prevItems.filter(_item => _item.id !== id));
    }, []);

  const keyboard = useMemo(() => {
    if (type === "phone") return "numeric";
    if (type === "email") return "email-address";
    return "default";
  }, [type]);

  return (
    <Container>
      {list.length > 0 ?
        list.map((data, index) =>
          <AddView key={data.id}>
            <TouchableOpacity onPress={() => onRemoveItem(data.id)}>
              <IconDel source={ICON_DEL} />
            </TouchableOpacity>

            <TextContent placeholder={hintText}
                         onChangeText={text => onChangeText(text, data.id)}
                         keyboardType={keyboard}
                         autoFocus={ data.data ? false : true }
            >{data.data}</TextContent>

          </AddView>
        )
        : null
      }

      <TouchableOpacity onPress={onAddNewItem}>
        <AddView>
          <IconAdd source={ICON_ADD} />
          <TextAdd>{text}</TextAdd>
        </AddView>
      </TouchableOpacity>
    </Container>
  );
});
