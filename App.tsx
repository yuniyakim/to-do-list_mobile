import { useState } from 'react'
import { ToDo } from './src/types/interfaces';
import { ToDoList } from './src/components/to-do-list/to-do-list'
import { ToDoForm } from './src/components/to-do-form/to-do-form'
import { Text, ScrollView } from 'react-native';
import { styles } from './src/styles/styles'

const App = () => {
  const [toDos, setToDos] = useState<ToDo[]>([])

  const addToDo = (toDo: ToDo) : ToDo[] => {
    const newToDos = [toDo, ...toDos];
    setToDos(newToDos);
    return newToDos;
  }

  return (
    <ScrollView contentContainerStyle={styles.toDo_list_app_container}>
      <Text style={styles.toDo_list_app_title}>ToDo List</Text>
      <ToDoForm addToDo={addToDo} />
      <ToDoList toDos={toDos} setToDos={setToDos} />
    </ScrollView>
  )
}

export default App;
