import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../utils/colors";
import { TransactionsList } from "../components/TransactionsList";

const openAddTransactionModal = () => {};

const addTransaction = () => {};

export const Transactions = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
        }}
      >
        <TransactionsList />
      </View>
      <View
        style={{
          marginBottom: 5,
          flexDirection: "row",
          justifyContent: "center",
          padding: 5,
          paddingTop: 10,
        }}
      >
        <Button
          onPress={openAddTransactionModal}
          buttonStyle={{
            borderRadius: 10,
            padding: 15,
            backgroundColor: Colors.blue,
          }}
          titleStyle={{
            marginLeft: 5,
          }}
          icon={
            <Icon
              name="plus-circle"
              type="material-community"
              color={Colors.white}
            />
          }
          title="Add Transaction"
        />
      </View>
    </View>
  );
};
