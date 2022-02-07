import React, {useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {listTasks, deleteTask} from '../../actions/taskActions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Spacer,
  Avatar,
  View,
  Center,
  Button,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const List = () => {
  const navigation = useNavigation ();
  const dispatch = useDispatch ();
  const tasksList = useSelector (state => state.tasksList);
  const {loading, error, tasks} = tasksList;
  const taskDelete = useSelector (state => state.taskDelete);

  useEffect (() => {
    dispatch (listTasks ());
  }, []);

  const deleteTask = id => {
    return Alert.alert ('Excluir Task', 'Você tem certeza ??', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {text: 'Confirmar', onPress: () => dispatch (deleteTask (id))},
    ]);
  };

  return (
    <View>
      {loading
        ? <Center mt={150}>
            <Spinner color="gray.900" size="sm" />
          </Center>
        : tasks.length == []
            ? <Center mt={150}>
                <FontAwesome name="tasks" size={150} color="gray" />
                <Heading size="md" color="gray.500">
                  Nenhuma task salva
                </Heading>
              </Center>
            : error
                ? <Center mt={150}>
                    <Heading size="md" color="red.300">
                      {error}
                    </Heading>
                  </Center>
                : <FlatList
                    style={{marginTop: 20, marginBottom: 35}}
                    contentContainerStyle={{
                      paddingHorizontal: 5,
                    }}
                    data={tasks}
                    renderItem={({item}) => (
                      <Box
                        borderBottomWidth="1"
                        _dark={{
                          borderColor: 'gray.600',
                        }}
                        borderColor="coolGray.200"
                        pl="4"
                        pr="5"
                        py="2"
                      >
                        <HStack space={3} justifyContent="space-between">
                          <Avatar
                            borderRadius={10}
                            size="48px"
                            source={{
                              uri: item.image,
                            }}
                          />
                          <VStack>
                            <Text
                              _dark={{
                                color: 'warmGray.50',
                              }}
                              color="coolGray.800"
                              bold
                              numberOfLines={2}
                              ellipsizeMode="head"
                            >
                              {item.title}

                            </Text>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: 'warmGray.200',
                              }}
                            >

                              {moment (item.datetime).format ('DD/MM/YYYY')}
                            </Text>
                          </VStack>
                          <Spacer />
                          <HStack
                            space={1}
                            p="2"
                            justifyContent="space-between"
                          >
                            <Button
                              bg="gray.700"
                              onPress={() =>
                                navigation.push ('TaskView', {id: item.id})}
                            >
                              <AntDesign name="eyeo" size={20} color="white" />
                            </Button>
                            <Button
                              bg="yellow.300"
                              onPress={() =>
                                navigation.push ('Form', {
                                  id: item.id,
                                })}
                            >
                              <FontAwesome
                                name="pencil"
                                size={20}
                                color="white"
                              />
                            </Button>
                            <Button
                              bg="red.500"
                              onPress={() => deleteTask (item.id)}
                            >
                              <FontAwesome
                                name="trash-o"
                                size={20}
                                color="white"
                              />
                            </Button>
                          </HStack>
                        </HStack>
                      </Box>
                    )}
                    keyExtractor={item => item.id}
                  />}
    </View>
  );
};

export default List;
