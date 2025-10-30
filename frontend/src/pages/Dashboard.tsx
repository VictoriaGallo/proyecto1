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
              <Heading mb={2}>Dashboard</Heading>
              <Text color="gray.600">Bienvenido a DoYouRemember</Text>
            </Box>
            
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem>
                <Card>
                  <CardBody>
                    <HStack justify="space-between" mb={2}>
                      <Heading size="sm">Fotos Subidas</Heading>
                    </HStack>
                    <Text fontSize="2xl" fontWeight="bold" color="blue.500">12</Text>
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
                    <Text fontSize="2xl" fontWeight="bold" color="green.500">8</Text>
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
                    <Text fontSize="2xl" fontWeight="bold" color="purple.500">3</Text>
                    <Text fontSize="sm" color="gray.500">Último: ayer</Text>
                  </CardBody>
                </Card>
              </GridItem>
            </Grid>

            <Card>
              <CardBody>
                <Heading size="md" mb={4}>Funcionalidades del Prototipo</Heading>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Gestión de Fotos</Text>
                    <Text fontSize="sm" color="gray.600">• Subir fotos personales</Text>
                    <Text fontSize="sm" color="gray.600">• Etiquetar y organizar</Text>
                    <Text fontSize="sm" color="gray.600">• Ver historial</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Descripción de Fotos</Text>
                    <Text fontSize="sm" color="gray.600">• Describir por texto</Text>
                    <Text fontSize="sm" color="gray.600">• Grabación de voz</Text>
                    <Text fontSize="sm" color="gray.600">• Asistente paso a paso</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Análisis y Reportes</Text>
                    <Text fontSize="sm" color="gray.600">• Métricas de recall</Text>
                    <Text fontSize="sm" color="gray.600">• Tendencias temporales</Text>
                    <Text fontSize="sm" color="gray.600">• Reportes detallados</Text>
                  </VStack>
                  <VStack align="start" spacing={2}>
                    <Text fontWeight="bold">Alertas y Recordatorios</Text>
                    <Text fontSize="sm" color="gray.600">• Configurar umbrales</Text>
                    <Text fontSize="sm" color="gray.600">• Notificaciones automáticas</Text>
                    <Text fontSize="sm" color="gray.600">• Recordatorios de sesiones</Text>
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