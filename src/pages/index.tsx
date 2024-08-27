// pages/index.tsx
import { Box, Button, Container, Flex, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react';

export default function Home() {
  // const headingSize = useBreakpointValue({ base: '2xl', md: '4xl' });

  return (
    <Container maxW="container.xl" py={10}>
      {/* Hero Section */}
      <Flex direction="column" align="center" justify="center" textAlign="center" mb={10}>
        <Heading as="h1" size={"2xl"} mb={4} bgClip="text">
          Welcome to ClimbHub
        </Heading>
        <Text fontSize="xl" mb={6}>
          Discover and connect with the best climbing gyms worldwide.
        </Text>
        <Button  size="lg">
          Get Started
        </Button>
      </Flex>

      {/* Gym List Section */}
      <Stack spacing={8}>
        <Flex wrap="wrap" justify="center">
          <Box maxW="sm" borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
            <Heading as="h3" size="md" mb={2}>
              Gym Name 1
            </Heading>
            <Text mb={4}>Location: City, Country</Text>
            <Button  variant="outline">
              View Gym
            </Button>
          </Box>
          <Box maxW="sm" borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
            <Heading as="h3" size="md" mb={2}>
              Gym Name 2
            </Heading>
            <Text mb={4}>Location: City, Country</Text>
            <Button variant="outline">
              View Gym
            </Button>
          </Box>
          <Box maxW="sm" borderWidth={1} borderRadius="lg" overflow="hidden" p={4}>
            <Heading as="h3" size="md" mb={2}>
              Gym Name 3
            </Heading>
            <Text mb={4}>Location: City, Country</Text>
            <Button variant="outline">
              View Gym
            </Button>
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
