import { SubmitHandler, useForm } from 'react-hook-form';

import * as yup from 'yup';

// import { yupResolver } from '@hookform/resolvers/yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import Link from 'next/Link';

import { useMutation } from 'react-query';

import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button,
} from '@chakra-ui/react';
import { Input } from '../../components/Form/Input';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';
import { useRouter } from 'next/router';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha obrigatório')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas não conferem'),
});

export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post('/users', {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess: () => {
        // realiza um invalidate após criar um usuário
        queryClient.invalidateQueries('users');
      },
    },
  );

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
  });

  const errors = formState.errors;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    // await new Promise((res) => setTimeout(res, 2000));
    // console.log(data);

    await createUser.mutateAsync(data);

    router.push('/users');
  };

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={['6', '8']}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">
            Criar usuário
          </Heading>

          <Divider my="5" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="name"
                type="text"
                label="Nome completo"
                {...register('name')}
                error={errors?.name}
              />
              <Input
                name="email"
                type="email"
                label="Email"
                {...register('email')}
                error={errors?.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors?.password}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirme a senha"
                {...register('password_confirmation')}
                error={errors?.password_confirmation}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" bg="whiteAlpha">
                  Cancelar
                </Button>
              </Link>

              <Button
                bg="pink.500"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
