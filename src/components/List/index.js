import React from 'react';
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
  Button,
  ScrollView,
} from 'native-base';

const List = () => {
  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Rebocar Parede',
      timeStamp: '03/02/1992',
      avatarUrl: 'https://s2.glbimg.com/CrTrmLu7obeP3NoLgPatN4U2fMk=/620x480/e.glbimg.com/og/ed/f/original/2018/05/21/faxina.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53asbb28ba',
      name: 'Limpar Terreno',
      timeStamp: '03/02/1992',
      avatarUrl: 'https://s2.glbimg.com/CrTrmLu7obeP3NoLgPatN4U2fMk=/620x480/e.glbimg.com/og/ed/f/original/2018/05/21/faxina.jpg',
    },
    {
      id: 'bd7acbea-cwq1b1-46c2-aed5-3ad53abb28ba',
      name: 'Limpar Cozinha',
      timeStamp: '03/02/1992',
      avatarUrl: 'https://reactjs.org/logo-og.png',
    },
  ];
  return (
    <View>
      <Heading fontSize="xl" marginTop="-15px" />
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
                    uri: item.avatarUrl,
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
                    {item.name}

                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: 'warmGray.200',
                    }}
                  >
                    {item.timeStamp}
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
