import {
  FormLabel,
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  label?: string;
  name: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <FormControl>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        id={name}
        name={name}
        size="lg"
        variant="filled"
        bgColor="gray.900"
        focusBorderColor="pink.500"
        _hover={{ bgColor: 'gray.900' }}
        {...rest}
      />
    </FormControl>
  );
}
