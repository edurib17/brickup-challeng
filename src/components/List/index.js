import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Box,
  Heading,
  FlatList,
  HStack,
  Text,
  VStack,
  Spacer,
  Avatar,
  View,
  Center,
  Button,
  Spinner,
  ScrollView,
} from 'native-base';
import realm from '../../services/TaskSchema';
import moment from 'moment';

const List = () => {
  const [data, setData] = useState ([]);
  const [toast, setToast] = useState (false);

  useEffect (() => {
    setToast (true);
    const tasks = realm.objects ('Task');
    setData (tasks);
    setToast (false);
    realm.write (() => {
      // realm.deleteAll()
      //realm.delete(realm.objects('Task'));
    });
  }, []);

  return (
    <View>
      <Heading fontSize="xl" marginTop="-15px" />
      {data.length <= 0 && toast == false
        ? <Center mt={150}>
            <FontAwesome name="tasks" size={150} color="gray" />
            <Heading size="md" color="gray.500">
              Nenhuma task registrada
            </Heading>
          </Center>
        : null}
      {toast
        ? <Center mt={150}>
            <Spinner color="gray.900" size="sm" />
          </Center>
        : null}
      <ScrollView maxW="900" h="100%">
        <FlatList
          data={data}
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
                <HStack space={1} p="2" justifyContent="space-between">
                  <Button bg="gray.700">
                    <AntDesign name="eyeo" size={20} color="white" />
                  </Button>
                  <Button bg="yellow.300">
                    <FontAwesome name="pencil" size={20} color="white" />
                  </Button>
                  <Button bg="red.500">
                    <FontAwesome name="trash-o" size={20} color="white" />
                  </Button>
                </HStack>
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
        <Box mt="25px" />
      </ScrollView>
    </View>
  );
};

export default List;
