import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

import { Colors } from "./utils/colors";

import { Transactions } from "./pages/Transactions";
import { Accounts } from "./pages/Accounts";
import { Budgets } from "./pages/Budgets";

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      height: 5,
      backgroundColor: Colors.teal,
    }}
    style={{
      padding: 10,
      paddingTop: 25,
      backgroundColor: Colors.blue,
    }}
    labelStyle={{
      fontSize: 10,
    }}
  />
);

const initialLayout = { width: Dimensions.get("window").width };

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "transactions", title: "Transactions" },
    { key: "accounts", title: "Accounts" },
    { key: "budgets", title: "Budgets" },
  ]);

  const renderScene = SceneMap({
    transactions: Transactions,
    accounts: Accounts,
    budgets: Budgets,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}
