// import { Button, Container, Heading, VStack, Text, Box, Select, FormControl, FormLabel, HStack, Badge } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { ROLES } from "../lib/roles";
// import type { Role } from "../types/auth";

// export default function Login() {
//   const navigate = useNavigate();
//   const [selectedRole, setSelectedRole] = useState<Role>(ROLES.PATIENT);

//   const handleDemoLogin = () => {
//     // Simular login exitoso con rol seleccionado
//     localStorage.setItem("demo-user", "true");
//     localStorage.setItem("demo-role", selectedRole);
//     navigate("/");
//   };

//   const getRoleDescription = (role: Role) => {
//     switch (role) {
//       case ROLES.PATIENT:
//         return "Paciente que describe fotos y recibe recordatorios";
//       case ROLES.CAREGIVER:
//         return "Cuidador que sube fotos y monitorea al paciente";
//       case ROLES.DOCTOR:
//         return "Médico que analiza reportes y configura alertas";
//       default:
//         return "";
//     }
//   };

//   const getRoleIcon = (role: Role) => {
//     switch (role) {
//       case ROLES.PATIENT:
//         return "";
//       case ROLES.CAREGIVER:
//         return "";
//       case ROLES.DOCTOR:
//         return "";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Container maxW="md" py={16}>
//       <VStack spacing={6}>
//         <Box textAlign="center">
//           <Heading size="lg" color="orange.500" mb={2}>
//             AlzheimerApp
//           </Heading>
//           <Text color="gray.600" mb={6}>
//             Detección temprana de Alzheimer
//           </Text>
//         </Box>

//         <Heading size="md">Iniciar sesión</Heading>

//         <VStack spacing={4} w="full">
//           <FormControl>
//             <FormLabel>Cual es tu tipo de Usuario?</FormLabel>
//             <Select 
//               value={selectedRole} 
//               onChange={(e) => setSelectedRole(e.target.value as Role)}
//             >
//               <option value={ROLES.PATIENT}>Paciente</option>
//               <option value={ROLES.CAREGIVER}>Cuidador</option>
//               <option value={ROLES.DOCTOR}>Médico</option>
//             </Select>
//           </FormControl>

//           <Box p={4} bg="gray.50" borderRadius="md" w="full">
//             <HStack>
//               <Text fontSize="2xl">{getRoleIcon(selectedRole)}</Text>
//               <VStack align="start" spacing={1}>
//                 <HStack>
//                   <Text fontWeight="bold" textTransform="capitalize">{selectedRole}</Text>
//                 </HStack>
//                 <Text fontSize="sm" color="gray.600">
//                   {getRoleDescription(selectedRole)}
//                 </Text>
//               </VStack>
//             </HStack>
//           </Box>

//           <Button 
//             colorScheme="orange" 
//             size="lg" 
//             w="full"
//             onClick={handleDemoLogin}
//           >
//             Iniciar sesión como {selectedRole}
//           </Button>

//         </VStack>
//       </VStack>
//     </Container>
//   );
// }
import {
  Button, Container, Heading, VStack, Text, Box, Select,
  FormControl, FormLabel, HStack, Input, useToast, Spinner
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROLES } from "../lib/roles";
import type { Role } from "../types/auth";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [selectedRole, setSelectedRole] = useState<Role>(ROLES.PATIENT);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://cumplisecure.onrender.com";

  const handleLogin = async (endpoint: string) => {
    // 🔹 Validar campos vacíos
    if (!correo || !contraseña) {
      toast({
        title: "Campos incompletos",
        description: "Por favor ingresa correo y contraseña",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 🔹 Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      toast({
        title: "Correo inválido",
        description: "Por favor ingresa un correo electrónico válido",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 🔹 Validar longitud de contraseña solo al crear usuario
    if (endpoint === "crear" && contraseña.length < 6) {
      toast({
        title: "Contraseña débil",
        description: "Debe tener al menos 6 caracteres",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // 🔹 Si pasa las validaciones, continuar con el fetch
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.error || "Error en la autenticación");
      }

      // Guardar sesión
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", selectedRole);

      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${data.user.email}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/");
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: err.message || "No se pudo iniciar sesión",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="md" py={16}>
      <VStack spacing={6}>
        <Box textAlign="center">
          <Heading size="lg" color="orange.500" mb={2}>
            AlzheimerApp
          </Heading>
          <Text color="gray.600" mb={6}>
            Detección temprana de Alzheimer
          </Text>
        </Box>

        <Heading size="md">Iniciar sesión</Heading>

        <VStack spacing={4} w="full">
          <FormControl>
            <FormLabel>Correo electrónico</FormLabel>
            <Input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="••••••••"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Tipo de Usuario</FormLabel>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as Role)}
            >
              <option value={ROLES.PATIENT}>Paciente</option>
              <option value={ROLES.CAREGIVER}>Cuidador</option>
              <option value={ROLES.DOCTOR}>Médico</option>
            </Select>
          </FormControl>

          <HStack w="full" justify="space-between" pt={4}>
            <Button
              colorScheme="orange"
              onClick={() => handleLogin("usuario")}
              w="48%"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Iniciar sesión"}
            </Button>

            <Button
              variant="outline"
              colorScheme="orange"
              onClick={() => handleLogin("crear")}
              w="48%"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Registrarse"}
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Container>
  );
}
