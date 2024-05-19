import React from 'react';
import {useState, Profiler} from 'react';
import {ScrollView, Text, Platform} from 'react-native';
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

  const onRender = (
    _id: string, 
    _phase: 'mount' | 'update' | 'nested-update', 
    actualDuration: number, 
    _baseDuration: number, 
    _startTime: number, 
    _commitTime: number
  ) => {
    // console.log(`Duration: ${actualDuration}`);
    // const urls = ['http://127.0.0.1:5555/pwa', 'http://10.0.2.2:5555/pwa', 'http://192.168.67.1:5555/pwa', 'http://192.168.0.100:5555/pwa'];
    // urls.forEach(url => {
    //   fetch(url, {
    //     method: 'GET',
    //   }).then(res => console.log(`${url}: ${res.text()}`)).catch(err => console.log(`${url}: ${err}`));

    //   // fetch(url, {
    //   //   method: 'POST',
    //   //   headers: {
    //   //     'Accept': 'application/json',
    //   //     'Content-Type': 'application/json'
    //   //   },
    //   //   body: JSON.stringify({app: 'mobile', platform: Platform.OS, time: actualDuration, device: 'Google Pixel 7'})
    //   // }).then(res => console.log(`${url}: ${res.text()}`)).catch(err => console.log(`${url}: ${err}`));
    // })
    const url = 'http://192.168.67.1:5555/add';
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({app: 'mobile', platform: Platform.OS, time: actualDuration, device: 'Google Pixel 7'})
    }).then(res => console.log(res.text()));
  }

  return (
    <Profiler id="App" onRender={onRender}>
      <ScrollView contentContainerStyle={styles.toDo_list_app_container}>
        <Text accessibilityLabel="todo-list-title" style={styles.toDo_list_app_title}>ToDo List</Text>
        <ToDoForm addToDo={addToDo} />
        <ToDoList toDos={toDos} setToDos={setToDos} />
      </ScrollView>
    </Profiler>
  );
};

export default App;
