import { Box, Heading, Text, Flex, VStack, HStack, Card, CardBody, Button, Alert, AlertIcon } from "@chakra-ui/react";
import { Navbar } from "../../components/Layout/Navbar";
import { Sidebar } from "../../components/Layout/Sidebar";
import { PhotoTagger } from "../../components/PhotoTagging/PhotoTagger";
import { useAuth } from "../../hooks/useAuth";
import { hasPermission } from "../../lib/roles";
import { useState } from "react";
import { FaTag } from "react-icons/fa";

export default function PhotosTag() {
  const { user } = useAuth();
  const [isTaggingActive, setIsTaggingActive] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const canTag = user && hasPermission(user.role, "upload_photos");

  const handleStartTagging = () => {
    // Simular selección de foto
    setSelectedPhoto({
      id: "demo-photo-tag",
      url: "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Foto+para+Etiquetar",
      tags: [
        {
          id: "tag-1",
          type: "person",
          value: "María",
          confidence: 0.9
        },
        {
          id: "tag-2", 
          type: "place",
          value: "Casa",
          confidence: 0.8
        }
      ],
      description: "Foto de María en casa",
      dateTaken: "2024-01-15",
      location: "Bogotá, Colombia"
    });
    setIsTaggingActive(true);
  };

  const handleSaveMetadata = (metadata: any) => {
    console.log("Metadatos guardados:", metadata);
    setIsTaggingActive(false);
    setSelectedPhoto(null);
  };

  const handleCancelTagging = () => {
    setIsTaggingActive(false);
    setSelectedPhoto(null);
  };

  if (!canTag) {
    return (
      <Box>
        <Navbar />
        <Flex>
          <Sidebar />
          <Box flex="1" p={6}>
            <Alert status="warning">
              <AlertIcon />
              No tienes permisos para etiquetar fotos con tu rol actual.
            </Alert>
          </Box>
        </Flex>
      </Box>
    );
  }

  if (isTaggingActive && selectedPhoto) {
    return (
      <Box>
        <Navbar />
        <Flex>
          <Sidebar />
          <Box flex="1" p={6}>
            <PhotoTagger
              photo={selectedPhoto}
              onSave={handleSaveMetadata}
              onCancel={handleCancelTagging}
              canEdit={true}
            />
          </Box>
        </Flex>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Flex>
        <Sidebar />
        <Box flex="1" p={6}>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading mb={2}>Etiquetar Fotos</Heading>
              <Text color="gray.600">
                Organiza tus fotos agregando etiquetas y metadatos detallados
              </Text>
            </Box>

            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <Text fontWeight="bold" fontSize="lg">
                    ¿Por qué etiquetar tus fotos?
                  </Text>
                  
                  <VStack spacing={3} align="start" w="full">
                    <Text fontSize="sm" color="gray.600">
                      <strong>Mejor organización:</strong> Encuentra fotos específicas más fácilmente
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Análisis mejorado:</strong> Los reportes serán más precisos y detallados
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Búsqueda rápida:</strong> Filtra por personas, lugares, eventos o emociones
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Seguimiento:</strong> Monitorea cambios en el reconocimiento de elementos
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={4}>
                  <Text fontWeight="bold">Selecciona una foto para etiquetar:</Text>
                  
                  {/* Demo: Foto de ejemplo */}
                  <Box 
                    p={4} 
                    border="2px dashed" 
                    borderColor="gray.300" 
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ borderColor: "blue.400" }}
                    onClick={handleStartTagging}
                  >
                    <VStack spacing={2}>
                      <img
                        src="https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=Foto+para+Etiquetar"
                        alt="Foto de ejemplo"
                        style={{ width: "200px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                      />
                      <Text fontSize="sm" color="gray.600">
                        Haz clic para etiquetar esta foto
                      </Text>
                    </VStack>
                  </Box>

                  <Button
                    leftIcon={<FaTag />}
                    colorScheme="blue"
                    size="lg"
                    onClick={handleStartTagging}
                  >
                    Iniciar Etiquetado
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <VStack spacing={3} align="start">
                  <Text fontWeight="bold">Tipos de etiquetas disponibles:</Text>
                  <VStack align="start" spacing={2} fontSize="sm" color="gray.600">
                    <HStack>
                      <Text fontWeight="bold" color="blue.500">Personas:</Text>
                      <Text>Nombres de familiares, amigos, conocidos</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold" color="green.500">Lugares:</Text>
                      <Text>Casa, parque, restaurante, ciudad, país</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold" color="purple.500">Objetos:</Text>
                      <Text>Comida, ropa, muebles, vehículos, regalos</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold" color="orange.500">Eventos:</Text>
                      <Text>Cumpleaños, bodas, vacaciones, reuniones</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold" color="red.500">Emociones:</Text>
                      <Text>Feliz, nostálgico, emocionado, tranquilo</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
