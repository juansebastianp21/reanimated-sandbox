import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ContactInfo, ContactListItem } from "./components/contact-list-item";

const App = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>();
  const [refreshing, setRefreshing] = useState(false);

  const contactsPlaceHolderList = useMemo(() => {
    return Array.from({ length: 15 }).map((_) => null);
  }, []);

  const fetchContacts = useCallback(async () => {
    // fetch contacts from  jason place holder
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    // wait for 2000ms to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setContacts(data);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchContacts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={contacts ?? contactsPlaceHolderList}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          return <ContactListItem contact={item} />;
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={styles.listFooter} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#D9DCDE",
  },
  listFooter: {
    height: 50,
  },
});
