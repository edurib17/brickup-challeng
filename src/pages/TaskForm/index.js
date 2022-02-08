import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import AlertTask from '../../components/AlertTask';
import {
  View,
  Input,
  Stack,
  FormControl,
  TextArea,
  IconButton,
  Button,
  Text,
  Center,
  Image,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import { useDispatch,useSelector} from 'react-redux';
import {registerTask, updateTask} from '../../actions/taskActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';

const TaskForm = ({route}) => {
  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState ('');
  const [image, setImage] = useState (null);
  const [alert, setAlert] = useState (false);
  const [error, setError] = useState (false);
  const [status, setStatus] = useState ({});
  const [id,setId] = useState("");
  const navigation = useNavigation ();
  const dispatch = useDispatch ();
  const taskCreate = useSelector (state => state.taskCreate);
  const taskUpdate = useSelector (state => state.taskUpdate);

  useEffect (
    () => {
          if(route.params?.id){
            setId(route.params.id)
            setTitle(route.params.title)
            setDescription(route.params.description)
            setImage(route.params.image)
          }
    },
    []
  );

  const pickImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary (options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        setImage (null)
        setImage (response.assets[0].uri);
      }
    });
  };

  const ativeAlert = (info, title) => {
    setAlert (true);
    setStatus ({
      status: info,
      title: title,
    });
    setTimeout (() => {
      setAlert (false);
    }, 2900);
  };

  const closeAlert = () => {
    setAlert (false);
  };

  const validate = () => {
    if (title === undefined) {
      setError(true);
      return false;
    } else if (title.length < 3) {
      setError (true);
      return false;
    } else if (description === undefined) {
      setError (true);
      return false;
    } else if (description.length < 5) {
      setError (true);
      return false;
    }
    return true;
  };

  async function saveTask () {
    if(!id) dispatch(registerTask (title, description, image))
    else dispatch(updateTask(id,title, description, image))
    ativeAlert ('success', 'Task salva com sucesso!!');
    setTimeout (() => {
      navigation.push ('Home');
    }, 1000);
  }

  async function handleAddTask () {
    if (image == null) return ativeAlert ('info', 'Escolha uma imagem!!');
    if (validate ()) {
      setError (false);
      await saveTask ();
      setTitle ('');
      setDescription ('');
      setImage (null);
    }
  }
  return (
    <View>
      <Header name="Cadastro" />
      <Center>
        {alert ? <AlertTask status={status} closeAlert={closeAlert} /> : null}
        <FormControl
          m="10"
          w="xs"
          maxW="300"
          isRequired
          isInvalid={error}>
          <Stack space={10}>
            <Stack>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Titulo
              </FormControl.Label>
              <Input maxLength={12} onChangeText={setTitle} value={title} />
              {error
                ? <FormControl.ErrorMessage
                    _text={{
                      fontSize: 'xs',
                      color: 'error.500',
                      fontWeight: 500,
                    }}
                  >
                      Título deve conter pelo menos 3 caracteres.
                  </FormControl.ErrorMessage>
                : <FormControl.HelperText
                    _text={{
                      fontSize: 'xs',
                    }}
                  >
                    Título deve conter pelo menos 3 caracteres.
                  </FormControl.HelperText>}
            </Stack>
            <Stack>
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Descrição
              </FormControl.Label>
              <TextArea
                h="24"
                w="xs"
                maxW="300"
                onChangeText={setDescription}
                value={description}
              />
              { error
                ? <FormControl.ErrorMessage
                    _text={{
                      fontSize: 'xs',
                      color: 'error.500',
                      fontWeight: 500,
                    }}
                  >
                     Descrição deve conter pelo menos 6 caracteres.
                  </FormControl.ErrorMessage>
                : <FormControl.HelperText
                    _text={{
                      fontSize: 'xs',
                    }}
                  >
                    Descrição deve conter pelo menos 6 caracteres.
                  </FormControl.HelperText>}
              <Center>
                {image &&
                  <Image
                    alt="image"
                    source={{uri: image}}
                    style={{
                      width: 200,
                      height: 150,
                      marginTop: 25,
                      borderRadius: 12,
                    }}
                  />}
              </Center>
            </Stack>
            <Stack space={2}>
              <IconButton
                bg="blue.400"
                alignItems="center"
                onPress={pickImage}
                icon={<Icon name="camera" size={20} color="white" />}
              />

              <Button
                bg="green.500"
                alignItems="center"
                onPress={handleAddTask}
              >
                <Text color="white">Salvar</Text>
              </Button>
            </Stack>
          </Stack>
        </FormControl>
      </Center>
    </View>
  );
};

export default TaskForm;
