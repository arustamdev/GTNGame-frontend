import { Card, CardHeader, Flex, Box, Heading, Text } from '@chakra-ui/react';
import WebApp from '@twa-dev/sdk';

function Header() {
  const firstName = WebApp.initDataUnsafe.user?.first_name ?? '';
  const lastName = WebApp.initDataUnsafe.user?.last_name ?? '';
  const tag = WebApp.initDataUnsafe.user?.username;

  return (
    <>
      <Card maxW="md">
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name="Name" src="" /> */}
            <Box>
              <Heading size="md">{`${firstName} ${lastName}`}</Heading>
              <Text>{`@${tag}`}</Text>
            </Box>
          </Flex>
        </CardHeader>
      </Card>
    </>
  );
}

export default Header;
