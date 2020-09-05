import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Animated } from "react-native";
import { ListItem, Button, Icon } from "react-native-elements";
import { Colors } from "../utils/colors";

import TransactionData from "../data/transactions.json";

TransactionData.length = 50; // TESTING PURPOSES ONLY

const availableBalanceHeight = 100;

export const TransactionsList = () => {
  const [groupedTransactions, setGroupedTransactions] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(214200);
  const scrollY = new Animated.Value(0);
  const scrollYDiffClamp = Animated.diffClamp(
    scrollY,
    0,
    availableBalanceHeight
  );
  const headerY = scrollYDiffClamp.interpolate({
    inputRange: [0, availableBalanceHeight],
    outputRange: [0, -availableBalanceHeight],
    extrapolate: "clamp",
  });

  const toDollar = (amount) => {
    return `$${(amount / 100).toFixed(2)}`;
  };

  useEffect(() => {
    const groupTransactionsByDate = () => {
      return TransactionData.reduce((groups, transaction) => {
        const date = transaction.Date;
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
      }, {});
    };

    setGroupedTransactions(groupTransactionsByDate());
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: availableBalanceHeight,
          padding: 15,
          paddingTop: 20,
          zIndex: 1000,
          elevation: 1000,
          backgroundColor: Colors.teal,
          transform: [
            {
              translateY: headerY,
            },
          ],
        }}
      >
        <Text style={{ textAlign: "center", color: Colors.white }}>
          AVAILABLE BALANCE
        </Text>
        <Text
          style={{ textAlign: "center", fontSize: 45, color: Colors.white }}
        >
          {toDollar(availableBalance)}
        </Text>
      </Animated.View>
      {groupedTransactions && (
        <Animated.ScrollView
          style={{
            paddingTop: 110,
            backgroundColor: Colors.teal,
          }}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollY } },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          {Object.keys(groupedTransactions).map((transactionDate, index) => (
            <View
              style={{
                backgroundColor: Colors.white,
                borderTopLeftRadius: index === 0 ? 30 : 0,
                borderTopRightRadius: index === 0 ? 30 : 0,
              }}
              key={index}
            >
              <Text
                style={{
                  color: Colors.blue,
                  fontWeight: "bold",
                  padding: 5,
                  marginLeft: 10,
                  marginTop: 25,
                }}
              >
                {transactionDate}
              </Text>
              {groupedTransactions[transactionDate].map(
                (transaction, index) => (
                  <ListItem
                    key={index}
                    containerStyle={{ alignItems: "flex-start" }}
                    bottomDivider
                  >
                    {transaction.Outflow ? (
                      <Icon
                        color={Colors.orange}
                        type="material-community"
                        name="download"
                      />
                    ) : (
                      <Icon
                        color={Colors.teal}
                        type="material-community"
                        name="upload"
                      />
                    )}
                    <ListItem.Content
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{transaction.Payee}</Text>
                      <Text style={{ textAlign: "right" }}>
                        {transaction.Outflow || transaction.Inflow}
                      </Text>
                    </ListItem.Content>
                  </ListItem>
                )
              )}
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};
