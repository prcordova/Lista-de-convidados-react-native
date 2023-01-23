import {
  Text,
  Alert,
  ScrollView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";

export function Home() {
  const [eventDate, setEventDate] = useState("");
  const [eventName, setEventName] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");
  const [eventValid, setEventValid] = useState(0);
  function handleParticipantAdd() {
    if (participantName === "") {
      return Alert.alert(
        "Campo inválido",
        "Insira um nome válido e tente novamente."
      );
    }
    if (participants.includes(participantName)) {
      return Alert.alert(
        "Participante Existe",
        "Já existe um participante na lista com esse nome."
      );
    }
    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }
  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Deseja remover ${name} ? `, [
      {
        text: "Sim",
        onPress: () =>
          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          ),
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  function handleState(value: string) {
    setParticipantName(value);
  }
  function handleNewEvent() {
    if (eventName !== "") {
      return setEventValid(2);
    }
  }

  function handleBack() {
    if (!eventName) {
      setEventValid(0);
      console.log("back", "if");
    } else {
      console.log("back", "else");
      setEventValid(1);
    }
  }
  function deleteData() {
    setParticipants([]);
    setEventValid(0);
    setEventName("");
    setParticipantName("");
  }
  return (
    <>
      <View style={styles.container}>
        {eventValid === 0 ? (
          <>
            <View style={styles.eventForm}>
              <View style={styles.form}>
                <TextInput
                  value={eventName}
                  onChangeText={setEventName}
                  style={styles.input}
                  placeholder="Nome do Evento"
                  placeholderTextColor="#6b6b6b"
                />
              </View>

              <View style={styles.createEventContainer}>
                <TouchableOpacity
                  style={styles.createEventButton}
                  onPress={handleNewEvent}
                >
                  <Text style={styles.buttonText}>Criar evento</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : eventValid === 1 ? (
          <View style={styles.createEventContainer}>
            <Text style={styles.buttonContent}>Lista de eventos :</Text>
            <TouchableOpacity
              style={styles.buttonContent}
              onPress={handleNewEvent}
            >
              <Text style={styles.eventName}>{eventName}</Text>
              <Text style={styles.eventDate}>
                Participantes : {participants.length}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteDataButton}
              onPress={deleteData}
            >
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        ) : eventValid === 2 ? (
          <>
            <Text style={styles.eventName}>{eventName}</Text>
            <Text style={styles.eventDate}>{eventDate}</Text>
            <View style={styles.form}>
              <TextInput
                value={participantName}
                onChangeText={handleState}
                style={styles.input}
                placeholder="Adicionar participante"
                placeholderTextColor="#6b6b6b"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleParticipantAdd}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.eventDate}>
              Total de participantes : {participants.length}
            </Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={participants}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Participant
                  key={item}
                  name={item}
                  onRemove={() => handleParticipantRemove(item)}
                />
              )}
              ListEmptyComponent={() => (
                <Text style={styles.listEmptyText}>
                  Ninguem chegou no evento ainda ? Adicione participantes a sua
                  lista de presença.
                </Text>
              )}
            />
          </>
        ) : null}
        {eventValid === 2 ? (
          <View style={styles.createEventContainer}>
            <TouchableOpacity
              style={styles.createEventButton}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}
