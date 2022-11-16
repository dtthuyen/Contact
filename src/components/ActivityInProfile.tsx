import * as React from "react";
import styled from "styled-components";
import { useMemo } from "react";

const View = styled.View`
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

const Circle = styled.TouchableOpacity<{isActive: boolean}>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${p => p.isActive ? '#F2A54A' : 'white' };
  border-color: #BDBDBD;
  border-width: ${p => p.isActive ? 0 : 1 }px;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text<{isActive: boolean }>`
  margin-top: 4px;
  font-size: 11px;
  color: ${p => p.isActive ? '#F2A54A' : '#BDBDBD'};
`;

const Icon = styled.Image<{isActive: boolean }>`
  tint-color: ${p => p.isActive ? 'white' : '#DADADA'}
`;

interface props {
  type: string
  data: Array<string>;
  onPress: () => void;
  text: string;
  src: string
}

export const ActivityInProfile = ({ type, data, onPress, src, text } : props) => {
  const StyleIcon = useMemo(() => {
    if(type === 'call') return {
      width: 18,
      height: 18
    }
    if(type === 'mess') return {
      width: 24,
      height: 24
    }
    if(type === 'video') return {
      width: 18,
      height: 12
    }
    if(type === 'email') return {
      width: 24,
      height: 24
    }
  }, [type])

  const isActive = useMemo(() => {
    return data.length > 0
  },[data])

  return (
    <View>
      <Circle isActive={isActive} onPress={onPress}>
        <Icon isActive={isActive} style={StyleIcon} source={src} />
      </Circle>
      <Text isActive={isActive}>{text}</Text>
    </View>
  )
}
