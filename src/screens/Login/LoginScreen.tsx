import * as React from "react";
import styled from 'styled-components/native';

import {ICON_LOGO, IMG_BANNER_LOGO, SMALL_CIRCLE} from '../../assets'
import { Colors } from "../../themes/Colors";
import { navigateToHomeScreen } from "../../utils/navigation";
import { memo } from "react";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const SectionImage = styled.View`
  margin-top: 67px;
  height: 275px;
  align-items: center;
  justify-content: center;
`;

const Section = styled.View`
  align-items: center;
  justify-content: center;
`;

const IconLogo = styled.Image`
  width: 200px;
  height: 200px;
`;

const BannerLogo = styled.Image`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
`;

const SectionInfo = styled.View`
  align-items: center;
  justify-content: space-between;
  height: 300px;
  margin-top: 7px;
`;

const Text_Title = styled.Text`
  color: ${Colors.backgroundColor};
  margin-top: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const SubText_Title = styled.Text`
  color: ${Colors.black};
  margin-top: 7px;
  font-size: 15px;
  text-align: center;
`;

const SmallCircle = styled.Image`
  width: 30px;
  height: 30px;
`;

const TextNotLogin = styled.Text`
  font-size: 15px;
  color: ${Colors.gray2};
  font-style: italic;
`;

const SectionLogin = styled.View`
  align-items: center;
`;

const View = styled.View`
  margin-top: 24px;
  width: 100%;
  padding-left: 37px;
  padding-right: 37px;
  background-color: ${Colors.white};
`;

const BtnLogin = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  background: ${Colors.backgroundColor};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

const TextLogin = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  color: ${Colors.white};
`;

const BtnLoginManual = styled(BtnLogin)`
  margin-top: 12px;
  border-width: 1px;
  border-color: ${Colors.backgroundColor};
  background: ${Colors.white};
`;

const TextLoginManual = styled(TextLogin)`
  color: ${Colors.backgroundColor};
`;

console.log('login screen mount');

const LoginScreen = memo(function LoginScreen()  {
  return (
    <Container>
      <SectionImage>
        <IconLogo source={ICON_LOGO}/>
        <BannerLogo source={IMG_BANNER_LOGO}/>
      </SectionImage>

      <SectionInfo>
        <Section>
          <Text_Title>Base contact</Text_Title>
          <SubText_Title>{`Gi???i ph??p qu???n l?? c??ng vi???c\n& d??? ??n to??n di???n cho doanh nghi???p 4.0`}</SubText_Title>
        </Section>
        <SmallCircle source={SMALL_CIRCLE}/>
        <TextNotLogin>B???n ch??a ????ng nh???p</TextNotLogin>
      </SectionInfo>

      <SectionLogin>
        <View>
          <BtnLogin onPress={navigateToHomeScreen} >
            <TextLogin>????ng nh???p b???ng base account</TextLogin>
          </BtnLogin>

          <BtnLoginManual>
            <TextLoginManual>????ng nh???p th??? c??ng</TextLoginManual>
          </BtnLoginManual>
        </View>
      </SectionLogin>
    </Container>
  );
});

export default LoginScreen;
