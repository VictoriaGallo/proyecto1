import { Button, Container, Heading, VStack, Text, Box, Select, FormControl, FormLabel, HStack, Badge } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROLES } from "../lib/roles";
import type { Role } from "../types/auth";

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<Role>(ROLES.PATIENT);

  const handleDemoLogin = () => {
    // Simular login exitoso con rol seleccionado
    localStorage.setItem("demo-user", "true");
    localStorage.setItem("demo-role", selectedRole);
    navigate("/");
  };

  const getRoleDescription = (role: Role) => {
    switch (role) {
      case ROLES.PATIENT:
        return "Paciente que describe fotos y recibe recordatorios";
      case ROLES.CAREGIVER:
        return "Cuidador que sube fotos y monitorea al paciente";
      case ROLES.DOCTOR:
        return "Médico que analiza reportes y configura alertas";
      default:
        return "";
    }
  };

  const getRoleIcon = (role: Role) => {
    switch (role) {
      case ROLES.PATIENT:
        return "";
      case ROLES.CAREGIVER:
        return "";
      case ROLES.DOCTOR:
        return "";
      default:
        return "";
    }
  };

  return (
    <Container maxW="md" py={16}>
      <VStack spacing={6}>
        <Box textAlign="center">
          <Heading size="lg" color="blue.500" mb={2}>
            DoYouRemember
          </Heading>
          <Text color="gray.600" mb={6}>
            Detección temprana de Alzheimer
          </Text>
        </Box>
        
        <Heading size="md">Iniciar sesión</Heading>
        
        <VStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Selecciona tu rol para la demo:</FormLabel>
            <Select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              <option value={ROLES.PATIENT}>Paciente</option>
              <option value={ROLES.CAREGIVER}>Cuidador</option>
              <option value={ROLES.DOCTOR}>Médico</option>
            </Select>
          </FormControl>

          <Box p={4} bg="gray.50" borderRadius="md" w="full">
            <HStack>
              <Text fontSize="2xl">{getRoleIcon(selectedRole)}</Text>
              <VStack align="start" spacing={1}>
                <HStack>
                  <Text fontWeight="bold" textTransform="capitalize">{selectedRole}</Text>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {getRoleDescription(selectedRole)}
                </Text>
              </VStack>
            </HStack>
          </Box>
          
          <Button 
            colorScheme="blue" 
            size="lg" 
            w="full"
            onClick={handleDemoLogin}
          >
            Entrar como {selectedRole}
          </Button>
          
        </VStack>
      </VStack>
    </Container>
  );
}