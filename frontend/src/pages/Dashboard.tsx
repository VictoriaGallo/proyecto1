import { Box, Heading, Text, Grid, GridItem, Card, CardBody, Flex, Badge, VStack, HStack } from "@chakra-ui/react";
import { Navbar } from "../components/Layout/Navbar";
import { Sidebar } from "../components/Layout/Sidebar";

export default function Dashboard() {
  return (
    <Box>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" p={6}>
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading mb={2}>Casa</Heading>
              <Text color="gray.600">Bienvenido a AzheimerApp</Text>
            </Box>
            
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem>
                <Card>
                  <CardBody>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">Fotos Subidas</Heading>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color="red.500">12</Text>
                    <Text fontSize="sm" color="gray.500">Última: hace 2 días</Text>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card>
                  <CardBody>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">Sesiones Completadas</Heading>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color="yellow.500">8</Text>
                    <Text fontSize="sm" color="gray.500">Promedio: 85%</Text>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card>
                  <CardBody>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">Reportes Generados</Heading>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">3</Text>
                    <Text fontSize="sm" color="gray.500">Último: ayer</Text>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            <Card>
              <CardBody>
                <Heading size="md" mb={4}>Funciones</Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Funciones principales para Paciente</Text>
                    <Text fontSize="sm" color="gray.600">Recordatorios automáticos (medicación, citas, comidas, ejercicios).</Text>
                    <Text fontSize="sm" color="gray.600">Reconocimiento de personas y lugares (con fotos y nombres).</Text>
                    <Text fontSize="sm" color="gray.600">Módulo de ejercicios cognitivos (juegos de memoria, atención, lenguaje).</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Funciones de gestión para Cuidador</Text>
                    <Text fontSize="sm" color="gray.600">Panel de control del paciente (rutinas, medicación, estado de ánimo, ubicación).</Text>
                    <Text fontSize="sm" color="gray.600">Configuración de recordatorios y actividades.</Text>
                    <Text fontSize="sm" color="gray.600">Historial de salud o progreso cognitivo.</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Para el profesional de la salud</Text>
                    <Text fontSize="sm" color="gray.600">Monitoreo de pacientes (registro cognitivo, pruebas y resultados).</Text>
                    <Text fontSize="sm" color="gray.600">Acceso a estadísticas y reportes.</Text>
                    <Text fontSize="sm" color="gray.600">Envío de recomendaciones personalizadas.</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Funciones generales</Text>
                    <Text fontSize="sm" color="gray.600">Autenticación y roles (paciente, cuidador, médico).</Text>
                    <Text fontSize="sm" color="gray.600">Modo accesible (fuentes grandes, voz, contraste alto).</Text>
                    <Text fontSize="sm" color="gray.600">Sincronización con la nube.</Text>
                    <Text fontSize="sm" color="gray.600">Privacidad y protección de datos médicos.</Text>
                  </VStack>
                </Grid>
              </CardBody>
            </Card>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}