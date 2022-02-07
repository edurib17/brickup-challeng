import React, {useEffect} from 'react';
import {listTaskDetails} from '../../actions/taskActions';
import {View, VStack, Box, Divider, Image, Center, Text,Spinner} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../components/Header';

const TaskView = ({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch ();
  const taskDetails = useSelector (state => state.taskDetails);
  const {loading, task} = taskDetails;

  useEffect (
    () => {
      dispatch (listTaskDetails(id));
    },
    [dispatch]
  );

  return (
    <View>
      <Header name="Task" />
      <Box border="1" mt={25} borderRadius="md">
        {loading ?
          <Center mt={150}>
            <Spinner color="gray.900" size="sm" />
          </Center>:(
            <VStack space="4" divider={<Divider />}>
            <Box px="4" pt="4">
              <Text>Título: {task[0]?.title}</Text>
            </Box>
            <Box px="4">
              <Text> Descrição: {task[0]?.description}</Text>
            </Box>
            <Box>
              <Text px="4">
                Imagem:
              </Text>
              <Center mt={5}>
                <Image
                  alt='image'
                  source={{
                    uri: task[0]?.image,
                  }}
                  style={{width: 300, height: 200, borderRadius: 20}}
                />
              </Center>
            </Box>
            </VStack>
          )}
      </Box>
    </View>
  );
};

export default TaskView;
