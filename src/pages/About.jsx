import { Box, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">About Us</Text>
        <Text>
          This is a video processing website where you can upload a video, add a logo, and download the processed video in 1:1 720p format.
        </Text>
      </VStack>
    </Box>
  );
};

export default About;