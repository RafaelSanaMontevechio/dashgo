import {
  Flex,
  FormLabel,
  FormControl,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              size="lg"
              variant="filled"
              bgColor="gray.900"
              focusBorderColor="pink.500"
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              size="lg"
              variant="filled"
              bgColor="gray.900"
              focusBorderColor="pink.500"
              _hover={{ bgColor: 'gray.900' }}
            />
          </FormControl>
        </Stack>

        <Button type="submit" mt="6" colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
