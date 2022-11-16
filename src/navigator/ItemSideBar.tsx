import { IC_OPTION } from "../assets";
import * as React from "react";
import styled from "styled-components";

const ItemView = styled.TouchableOpacity`
  height: 44px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`

const Icon = styled.Image`
  height: 20px;
  width: 20px;
  margin-bottom: 2px;
`

const TextItem = styled.Text`
  font-size: 15px;
  color: #333333;
  margin-left: 20px;
`

interface props {
  text: string
}

export const ItemSideBar = ({text} : props) => {
  return (
    <ItemView>
      <Icon source={IC_OPTION} />
      <TextItem>{text}</TextItem>
    </ItemView>
  )
}
