import { Box, Flex, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link as={RouterLink} to="/" color="white" fontSize="lg" fontWeight="bold">
            Home
          </Link>
        </Box>
        <Box>
          <Link as={RouterLink} to="/about" color="white" mx={2}>
            About
          </Link>
          <Link as={RouterLink} to="/contact" color="white" mx={2}>
            Contact
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;