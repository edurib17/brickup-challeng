import React from 'react';
import { LogBox } from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

//Pages
import Home from './src/pages/Home';
import TaskForm from './src/pages/TaskForm';
import TaskView from './src/pages/TaskView';
import store from "./src/store"


const App = () => {
  const Stack = createStackNavigator ();
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={TaskForm} />
            <Stack.Screen name="TaskView" component={TaskView} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>

    </NativeBaseProvider>
  );
};

export default App;
