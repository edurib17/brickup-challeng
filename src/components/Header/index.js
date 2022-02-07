import React from 'react';
import {Box, HStack, Text, View, IconButton, StatusBar} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({name}) => {
  const navigation = useNavigation ();
  return (
    <View>
      <StatusBar backgroundColor="#000" translucent barStyle="light-content" />
      <Box bg="#6200ee" safeAreaTop />
      <HStack
        bg="blue.500"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {name === 'Cadastro'
          ? <HStack
              p={3}
              w="60%"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                onPress={() => navigation.push ('Home')}
                icon={<Icon name="arrow-left" size={20} color="white" />}
              />
              <Box>
                <Text color="white" fontSize="20" fontWeight="bold">
                  {name}
                </Text>
              </Box>

            </HStack>
          : null}

        {name === 'Task'
          ? <HStack
              p={3}
              w="59%"
              justifyContent="space-between"
              alignItems="center"
            >
              <IconButton
                onPress={() => navigation.push ('Home')}
                icon={<Icon name="arrow-left" size={20} color="white" />}
              />
              <Box>
                <Text color="white" fontSize="20" fontWeight="bold">
                  {name}
                </Text>
              </Box>

            </HStack>
          : null}

        {name === 'Todo-List'
          ? <HStack
              p={3}
              w="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="white" m={1} p={1} fontSize="20" fontWeight="bold">
                {name}
              </Text>
              <IconButton
                onPress={() => navigation.push ('Form')}
                icon={<Icon name="plus-circle" size={20} color="white" />}
              />

            </HStack>
          : null}
      </HStack>
    </View>
  );
};

export default Header;
