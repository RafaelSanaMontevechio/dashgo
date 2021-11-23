import { Flex, Text, Box, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Rafael</Text>
        <Text color="gray.300" fontSize="small">
          rafael_sana@hotmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Rafael"
        src="https://github.com/rafaelsanamontevechio.png"
      />
    </Flex>
  );
}
