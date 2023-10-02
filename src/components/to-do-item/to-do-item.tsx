import { styles } from '../../styles/styles';
import { ToDoItemProps } from '../../types/interfaces';
import { View, Switch, Pressable, Text } from 'react-native';

export const ToDoItem = ({ toDo, completeToDo, deleteToDo }: ToDoItemProps) => {
  const handleComplete = () => {
    completeToDo(toDo.id);
  }

  const handleDelete = () => {
    deleteToDo(toDo.id);
  }

  return (
    <View style={styles.toDo_container}>
      <Switch style={styles.toDo_checkbox} onValueChange={handleComplete} value={toDo.completed}></Switch>
      <View style={toDo.completed ? styles.toDo_content_completed : styles.toDo_content}>
        <Text>
          {toDo.content}
        </Text>
      </View>
      <Pressable style={styles.toDo_delete_button} onPress={handleDelete}>
        <Text>
          Delete
        </Text>
      </Pressable>
    </View>
  );
}
