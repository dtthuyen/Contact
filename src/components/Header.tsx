import * as React from "react";
import { memo, useMemo } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { Colors } from "../themes/Colors";
import { BaseStyles } from "../themes/BaseStyles";

const Container = styled.View`
  padding: 26px 16px 6px 16px;
  width: 100%;
  background-color: ${p => p.type === 'profile' ? Colors.orange1 : Colors.white}
`;

const Head = styled.View`
  width: 100%;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row
`;

const BtnLeft1 = styled.Image`
  width: 24px;
  height: 24px;
`;

const BtnLeft2 = styled.Image`
  width: 20px;
  height: 20px;
`;

const TextTitle = styled.Text`
  font-size: 24px;
  color: ${Colors.black};
  font-weight: 500;
`;

const BtnRight = styled.TouchableOpacity`
  height: 25px;
  justify-content: center;
`;

const IconCamera = styled.Image`
  width: 25px;
  height: 25px;
`;

const TextValid = styled.Text`
  color: ${Colors.backgroundColor};
  font-size: 18px;
`

const TextInvalid = styled(TextValid)`
  color: ${Colors.gray2};
`

interface Props {
  title?: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  sourceLeft: any;
  sourceRight: any;
  type?: string;
  renderLeftHeader?: React.ReactElement;
  isChange?: boolean;
}

export const Header = memo(({ title, sourceLeft, sourceRight,onPressLeft, onPressRight, type, renderLeftHeader, isChange}: Props) => {
  const {paddingTopInsets} = BaseStyles();

  return (
    <Container style={paddingTopInsets} type={type}>
      <Head>
        {renderLeftHeader ? renderLeftHeader : (
          <TouchableOpacity onPress={onPressLeft}>
            { title
              ? <BtnLeft1 source={sourceLeft} />
              :  type === "profile"
                  ? <BtnLeft2 source={sourceLeft} />
                  : isChange
                  ? <TextInvalid>{sourceLeft}</TextInvalid>
                  : <TextValid>{sourceLeft}</TextValid>
            }
          </TouchableOpacity>
        )}

        <TextTitle>{title || ""}</TextTitle>
        <BtnRight onPress={onPressRight}>
          { title
            ? <IconCamera source={sourceRight} />
            :  type === "profile"
              ? <TextValid>{sourceRight}</TextValid>
              : isChange
                ? <TextValid>{sourceRight}</TextValid>
                : <TextInvalid>{sourceRight}</TextInvalid>
          }
        </BtnRight>
      </Head>
    </Container>
  );
});
