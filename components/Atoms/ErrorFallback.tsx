import { Box, Flex, Text, Heading, Button } from "@chakra-ui/react";
import type { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error }: FallbackProps) {
  return (
    <Flex
      w="full"
      h="100vh"
      bgColor="#E7E6D0"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        m="auto"
        w="fit-content"
        h="fit-content"
        bgColor="brand.green"
        borderRadius="xl"
      >
        <Heading color="white" py={8} px={16} textAlign="center">
          Something went wrong
        </Heading>
        <Text as="pre" bgColor="white" p={8} fontSize="2xl">
          {error.message}
        </Text>
        <Box textAlign="center" p={6}>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Box>
      </Box>
    </Flex>
  );
}

/* <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div> */

export default ErrorFallback;
