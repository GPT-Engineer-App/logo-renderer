import { useState } from "react";
import { Container, Text, VStack, Input, Button, Image } from "@chakra-ui/react";

const Index = () => {
  const [video, setVideo] = useState(null);
  const [logo, setLogo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleRender = async () => {
    if (!video || !logo) {
      console.error("Video or logo file is missing");
      return;
    }

    const formData = new FormData();
    formData.append("video", video);
    formData.append("logo", logo);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error processing video");
      }

      const blob = await response.blob();
      if (blob.type !== "video/mp4") {
        throw new Error("Processed file is not a valid MP4 video");
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "output.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error processing video:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Upload Your Video</Text>
        <Input type="file" accept="video/*" onChange={handleVideoUpload} />
        {videoPreview && <Image src={videoPreview} alt="Video Preview" />}
        <Text fontSize="2xl">Upload Your Logo</Text>
        <Input type="file" accept="image/*" onChange={handleLogoUpload} />
        <Button colorScheme="teal" onClick={handleRender}>Render</Button>
      </VStack>
    </Container>
  );
};

export default Index;