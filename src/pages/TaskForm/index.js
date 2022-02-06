import React, {useState} from 'react';
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
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import realm from '../../services/TaskSchema';

const TaskForm = () => {
  const [title, setTitle] = useState ('');
  const [description, setDescription] = useState ('');
  const [image, setImage] = useState (null);
  const [alert, setAlert] = useState (false);
  const [errors, setErrors] = useState ({});
  const [status, setStatus] = useState ({});
  const navigation = useNavigation ();

  const pickImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary (options, res => {
      if (res.didCancel) {
        console.log ('User cancelled image picker');
      } else {
        setImage (null);
        setImage (res.assets[0].uri);
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
      setErrors ({
        ...errors,
        title: 'Preencha título corretamente!!',
      });
      return false;
    } else if (title.length < 3) {
      setErrors ({
        ...errors,
        title: 'O campo título é muito pequeno',
      });
      return false;
    } else if (description === undefined) {
      setErrors ({
        ...errors,
        description: 'Preencha descrição corretamente!!',
      });
      return false;
    } else if (description.length < 5) {
      setErrors ({
        ...errors,
        description: 'O campo descrição é muito pequeno',
      });
      return false;
    }
    return true;
  };

  async function saveTask () {
    try {
      realm.write (() => {
        realm.create ('Task', {
          id: uuid.v4 (),
          title: title,
          description: description,
          image: image,
          datetime: Date(),
        });
      });
      ativeAlert ('success', 'Task salva com sucesso!!');
      setTimeout (() => {
        navigation.push ('Home');
      }, 1000);
    } catch (error) {
      console.log (error);
    }
  }

  async function handleAddTask () {
    if (image == null) return ativeAlert ('info', 'Escolha uma imagem!!');
    if (validate ()) {
      setErrors ({});
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
          isInvalid={'title' in errors}
        >
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
              {'title' in errors
                ? <FormControl.ErrorMessage
                    _text={{
                      fontSize: 'xs',
                      color: 'error.500',
                      fontWeight: 500,
                    }}
                  >
                    {errors.title}
                  </FormControl.ErrorMessage>
                : <FormControl.HelperText
                    _text={{
                      fontSize: 'xs',
                    }}
                  >
                    O título deve conter pelo menos 3 caracteres.
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
              {'description' in errors
                ? <FormControl.ErrorMessage
                    _text={{
                      fontSize: 'xs',
                      color: 'error.500',
                      fontWeight: 500,
                    }}
                  >
                    {errors.description}
                  </FormControl.ErrorMessage>
                : <FormControl.HelperText
                    _text={{
                      fontSize: 'xs',
                    }}
                  >
                    O título deve conter pelo menos 6 caracteres.
                  </FormControl.HelperText>}
              <Center>
                {image &&
                  <Image
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
