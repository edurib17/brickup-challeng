import React from 'react';
import {
  Center,
  Stack,
  Alert,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  CloseIcon,
} from 'native-base';

const AlertTask = ({status,closeAlert}) => {
  return (
    <Center>
      <Stack space={3} w="90%" maxW="400">
        <Alert variant="solid" w="100%" status={status.status}>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="white">
                  {status.title}
                </Text>
              </HStack>
              <IconButton
                onPress={()=>closeAlert()}
                variant="unstyled"
                icon={<CloseIcon size="3" color="white" />}
              />
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
};

export default AlertTask