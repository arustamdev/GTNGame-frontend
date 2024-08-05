import { Card, CardHeader, Flex, Box, Heading, Text } from '@chakra-ui/react';

function Header() {
  return (
    <>
      <Card maxW="md">
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name="Name" src="" /> */}
            <Box>
              <Heading size="md">Name</Heading>
              <Text>@tag</Text>
            </Box>
          </Flex>
        </CardHeader>
      </Card>
    </>
  );
}

export default Header;
