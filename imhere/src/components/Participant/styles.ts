import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1e25",
    marginBottom: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#fff",

    marginLeft: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  button: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#e23c44",
  },
  idText: {
    alignItems: "flex-start",
    fontSize: 12,
    color: "#6b6b6b",
    marginLeft: 10,
  },
});
