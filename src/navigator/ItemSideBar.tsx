import { IC_OPTION, ICON_DEL } from "../assets";
import * as React from "react";
import styled from "styled-components";
import { useCallback, useState } from "react";

const ItemView = styled.TouchableOpacity`
  height: 44px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
`

const ViewShow = styled.TouchableOpacity`
  flex-direction: row;
`

const ViewEdit = styled.TouchableOpacity`
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

const IconDel = styled(Icon)`
  height: 16px;
  width: 16px;
`

interface props {
  text: string
  edit: boolean
}

export const ItemSideBar = ({text, edit} : props) => {
  const [isDelete, setDelete] = useState(false)

  const onDel = useCallback(() => {
    setDelete(true)
  }, [])

  return (
    !isDelete ?
    <ItemView>
      <ViewShow>
        <Icon source={IC_OPTION} />
        <TextItem>{text}</TextItem>
      </ViewShow>

      {edit ?
        <ViewEdit onPress={onDel}>
          <IconDel source={ICON_DEL} />
        </ViewEdit>
        : null
      }

    </ItemView>
      : null
    )
}
