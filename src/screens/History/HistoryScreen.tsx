import * as React from "react";
import styled from "styled-components/native";
import { Header } from "../../components/Header";
import { ScrollView } from "react-native";
import HistoryForm from "./HistoryForm";
import { ICON_CAMERA, ICON_MENU } from "../../assets";
import { navigateToAddContactScreen, toggleDrawer } from "../../utils/navigation";
import { Colors } from "../../themes/Colors";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.white};
`;

const ListView = styled.View`
  margin-top: 5px;
  flex: 1;
`

const data = [
  { value: "Lillie-Mai Allen", id: "lCUTs2" },
  { value: "Emmanuel Goldstein", id: "TXdL0c" },
  { value: "Winston Smith", id: "zqsiEw" },
  { value: "William Blazkowicz", id: "psg2PM" },
  { value: "Gordon Comstock", id: "1K6I18" },
  { value: "Philip Ravelston", id: "NVHSkA" },
  { value: "Rosemary Waterlow", id: "SaHqyG" },
  { value: "Julia Comstock", id: "iaT1Ex" },
  { value: "Mihai Maldonado", id: "OvMd5e" },
  { value: "David Molina", id: "125zqAO" },
  { value: "John Molina", id: "225zqAO" },
  { value: "Kevin Molina", id: "325zqAO" },
  { value: "Nobita Molina", id: "425zqAO" },
  { value: "Peter Petigrew", id: "8cWuu3" }
];

export const HistoryScreen = () => {
  return (
    <Container>
      <Header title={"Lịch sử"}
              onPressLeft={toggleDrawer}
              onPressRight={navigateToAddContactScreen}
              sourceLeft={ICON_MENU}
              sourceRight={ICON_CAMERA}
      />

      <ListView>
        <ScrollView>
          {
            data.map((item, index) => {
              return <HistoryForm key={index} name={item.value} phone="0123456789" />;
            })
          }
        </ScrollView>
      </ListView>

    </Container>
  );
};

