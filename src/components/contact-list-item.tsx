import { StyleSheet, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export type ContactInfo = {
  name: String;
  email: String;
};

type ContactListItemProps = {
  contact?: ContactInfo | null;
};

const skeletonCommonProps = {
  colorMode: "light",
  backgroundColo: "#6D6D6D",
  transition: { type: "timing", duration: 2000 },
} as const;

const fadeInTransitionCommonProps = {
  layout: LinearTransition,
  entering: FadeIn.duration(1500),
};

const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
  return (
    <Skeleton.Group show={contact == null}>
      <View style={styles.item}>
        <Skeleton width={70} height={70} radius={35} {...skeletonCommonProps}>
          {contact && (
            <Animated.View
              style={styles.avatar}
              {...fadeInTransitionCommonProps}
            >
              <Text style={styles.avatarText}>{contact.name[0]}</Text>
            </Animated.View>
          )}
        </Skeleton>
        <View style={styles.textContainer}>
          <Skeleton
            width="80%"
            height={30}
            radius={10}
            {...skeletonCommonProps}
          >
            {contact && (
              <Animated.Text
                style={styles.text}
                {...fadeInTransitionCommonProps}
              >
                {contact.name}
              </Animated.Text>
            )}
          </Skeleton>
          {contact == null && <View style={styles.spacer} />}
          <Skeleton width="70%" height={20} radius={6} {...skeletonCommonProps}>
            {contact && (
              <Animated.Text {...fadeInTransitionCommonProps}>
                {contact.email}
              </Animated.Text>
            )}
          </Skeleton>
        </View>
      </View>
    </Skeleton.Group>
  );
};

export { ContactListItem };

const styles = StyleSheet.create({
  item: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  avatar: {
    height: 70,
    aspectRatio: 1,
    borderRadius: 45,
    backgroundColor: "#073B57",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 20,
  },
  textContainer: {
    marginLeft: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  spacer: {
    height: 6,
  },
});
