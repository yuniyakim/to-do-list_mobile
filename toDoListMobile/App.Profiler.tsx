import {useState, Profiler} from 'react';
import {ScrollView, Text} from 'react-native';
import {ToDoForm} from './src/components/to-do-form/to-do-form';
import {ToDoList} from './src/components/to-do-list/to-do-list';
import {ToDo} from './src/types/interfaces';
import {styles} from './src/styles/styles';

const App = () => {
  const [toDos, setToDos] = useState<ToDo[]>([]);

  const addToDo = (toDo: ToDo): ToDo[] => {
    const newToDos = [toDo, ...toDos];
    setToDos(newToDos);
    return newToDos;
  };

  const onRender = (id: string, phase: 'mount' | 'update' | 'nested-update', actualDuration: number, baseDuration: number, startTime: number, commitTime: number) => {
    // console.log(`${id}'s ${phase} phase:`);
    // alert(`Actual duration: ${actualDuration}`);
    // console.log(`Actual duration: ${actualDuration}`);
    // alert(`Base duration: ${baseDuration}`);
    // console.log(`Base duration: ${baseDuration}`);
    // console.log(`Start time: ${startTime}`);
    // console.log(`Commit time: ${commitTime}`);
  }

  return (
    <Profiler id="App" onRender={onRender}>
      <ScrollView contentContainerStyle={styles.toDo_list_app_container}>
        <Text style={styles.toDo_list_app_title}>ToDo List</Text>
        <ToDoForm addToDo={addToDo} />
        <ToDoList toDos={toDos} setToDos={setToDos} />
      </ScrollView>
    </Profiler>
  );
};

export default App;
