import { useState } from 'react';
import { ToDoFormProps } from '../../types/interfaces';
import { Pressable, View, TextInput, Text } from 'react-native';
import { styles } from '../../styles/styles';

export const ToDoForm = ({ addToDo }: ToDoFormProps) => {
  const [inputText, setInputText] = useState('');

  const submitToDoHandler = () => {
    if (inputText) {
      addToDo({ id: Date.now() + Math.random(), content: inputText, completed: false });
    }
    setInputText('');
  }

  return (
    <View style={styles.toDo_form}>
      <TextInput
        style={styles.toDo_input}
        keyboardType="default"
        value={inputText}
        placeholder="Add ToDo"
        onChangeText={setInputText}
      />
      <Pressable style={styles.toDo_add_button} onPress={submitToDoHandler}>
        <Text>
          Add
        </Text>
      </Pressable>
    </View>
  );
};
