import {
  useToast
} from '@chakra-ui/react';

export const Toast = ({title, description}) => {
  const toast = useToast();
  return toast({
          title: title,
          description: description,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
}