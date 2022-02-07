import React, {useEffect} from 'react';
import {Image} from "react-native"
import {listTaskDetails} from '../../actions/taskActions';
import {
  View,
  Box,
  Center,
  Text,
  Spinner,
  HStack,
  Stack,
  AspectRatio,
  Heading,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';
import moment from 'moment';

const TaskView = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const taskDetails = useSelector(state => state.taskDetails);
  const {loading, task} = taskDetails;

  useEffect (
    () => {
      dispatch(listTaskDetails(id));

    },
    [dispatch]
  );

  return (
    <View>
      <Header name="Task" />
       {loading ?
          <Center mt={150}>
            <Spinner color="gray.900" size="sm" />
          </Center>
          : 
          <Box alignItems="center" mt={50}>
            <Box
              maxW="80"
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}
            >
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{uri: task[0]?.image}}
                    alt="image"
                    style={{width:250,height:250}}
                  />
                </AspectRatio>
              </Box>
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {task[0]?.title}
                  </Heading>
                </Stack>
                <Text fontWeight="400">
                {task[0]?.description}
                </Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400"
                    >
                      {moment (task[0]?.datetime).format ('DD/MM/YYYY')}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
      </Box>}
    </View>
  );
};

export default TaskView;
