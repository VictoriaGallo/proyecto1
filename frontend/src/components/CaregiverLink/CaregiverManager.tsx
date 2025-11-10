import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus, FaTrash, FaUserPlus, FaEye, FaEdit } from "react-icons/fa";
import type { CaregiverLink, CaregiverInvitation, Patient } from "../../types/caregiver";

interface CaregiverManagerProps {
  patientId: string;
  canManage?: boolean;
}

export function CaregiverManager({ patientId, canManage = false }: CaregiverManagerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCaregiver, setSelectedCaregiver] = useState<CaregiverLink | null>(null);
  const [invitationForm, setInvitationForm] = useState({
    email: "",
    relationship: "",
    message: "",
  });
  const toast = useToast();

  // Datos demo
  const [caregivers] = useState<CaregiverLink[]>([
    {
      id: "caregiver-1",
      caregiverId: "user-123",
      patientId: patientId,
      relationship: "Hijo",
      status: "active",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-15",
      permissions: [
        { id: "perm-1", type: "view_photos", granted: true, grantedAt: "2023-10-01" },
        { id: "perm-2", type: "upload_photos", granted: true, grantedAt: "2023-10-01" },
        { id: "perm-3", type: "view_reports", granted: true, grantedAt: "2023-10-01" },
        { id: "perm-4", type: "manage_reminders", granted: false },
        { id: "perm-5", type: "view_sessions", granted: true, grantedAt: "2023-10-01" },
      ],
    },
    {
      id: "caregiver-2",
      caregiverId: "user-456",
      patientId: patientId,
      relationship: "Cuidador profesional",
      status: "pending",
      createdAt: "2023-10-20",
      updatedAt: "2023-10-20",
      permissions: [
        { id: "perm-6", type: "view_photos", granted: false },
        { id: "perm-7", type: "upload_photos", granted: false },
        { id: "perm-8", type: "view_reports", granted: false },
        { id: "perm-9", type: "manage_reminders", granted: false },
        { id: "perm-10", type: "view_sessions", granted: false },
      ],
    },
  ]);

  const [invitations] = useState<CaregiverInvitation[]>([
    {
      id: "inv-1",
      patientId: patientId,
      caregiverEmail: "eliana@ejemplo.com",
      relationship: "Hija",
      message: "Soy tu hija eliana, me gustaría ayudarte con la aplicación.",
      status: "pending",
      expiresAt: "2023-11-01",
      createdAt: "2023-10-22",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "pending":
        return "yellow";
      case "rejected":
        return "red";
      case "revoked":
        return "gray";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo";
      case "pending":
        return "Pendiente";
      case "rejected":
        return "Rechazado";
      case "revoked":
        return "Revocado";
      default:
        return status;
    }
  };

  const handleSendInvitation = () => {
    if (!invitationForm.email || !invitationForm.relationship) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el email y la relación.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simular envío de invitación
    toast({
      title: "Invitación enviada",
      description: `Se envió una invitación a ${invitationForm.email}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setInvitationForm({ email: "", relationship: "", message: "" });
    onClose();
  };

  const handleAcceptInvitation = (invitationId: string) => {
    toast({
      title: "Invitación aceptada",
      description: "El cuidador ha sido vinculado exitosamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRejectInvitation = (invitationId: string) => {
    toast({
      title: "Invitación rechazada",
      description: "La invitación ha sido rechazada.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRevokeCaregiver = (caregiverId: string) => {
    toast({
      title: "Cuidador revocado",
      description: "El acceso del cuidador ha sido revocado.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between">
        <Box>
          <Heading size="md">Gestión de Cuidadores</Heading>
          <Text color="gray.600">
            Administra los cuidadores vinculados a este paciente
          </Text>
        </Box>
        {canManage && (
          <Button leftIcon={<FaUserPlus />} colorScheme="orange" onClick={onOpen}>
            Invitar Cuidador
          </Button>
        )}
      </HStack>

      {/* Cuidadores Activos */}
      <Card>
        <CardHeader>
          <Heading size="sm">Cuidadores Vinculados ({caregivers.length})</Heading>
        </CardHeader>
        <CardBody>
          {caregivers.length === 0 ? (
            <Alert status="info">
              <AlertIcon />
              No hay cuidadores vinculados aún.
            </Alert>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Relación</Th>
                  <Th>Estado</Th>
                  <Th>Permisos</Th>
                  <Th>Fecha</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {caregivers.map((caregiver) => (
                  <Tr key={caregiver.id}>
                    <Td>{caregiver.relationship}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(caregiver.status)}>
                        {getStatusText(caregiver.status)}
                      </Badge>
                    </Td>
                    <Td>
                      <Text fontSize="sm">
                        {caregiver.permissions.filter(p => p.granted).length} de {caregiver.permissions.length} permisos
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm">{caregiver.createdAt}</Text>
                    </Td>
                    <Td>
                      <HStack>
                        <IconButton
                          aria-label="Ver detalles"
                          icon={<FaEye />}
                          size="sm"
                          variant="ghost"
                        />
                        {canManage && (
                          <>
                            <IconButton
                              aria-label="Editar permisos"
                              icon={<FaEdit />}
                              size="sm"
                              variant="ghost"
                            />
                            <IconButton
                              aria-label="Revocar acceso"
                              icon={<FaTrash />}
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => handleRevokeCaregiver(caregiver.id)}
                            />
                          </>
                        )}
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Invitaciones Pendientes */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <Heading size="sm">Invitaciones Pendientes ({invitations.length})</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              {invitations.map((invitation) => (
                <Box key={invitation.id} p={4} borderWidth="1px" borderRadius="md">
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold">{invitation.caregiverEmail}</Text>
                      <Badge colorScheme="yellow">Pendiente</Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      Relación: {invitation.relationship}
                    </Text>
                    {invitation.message && (
                      <Text fontSize="sm" color="gray.600">
                        Mensaje: {invitation.message}
                      </Text>
                    )}
                    <Text fontSize="xs" color="gray.500">
                      Expira: {invitation.expiresAt}
                    </Text>
                    {canManage && (
                      <HStack>
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => handleAcceptInvitation(invitation.id)}
                        >
                          Aceptar
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleRejectInvitation(invitation.id)}
                        >
                          Rechazar
                        </Button>
                      </HStack>
                    )}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </CardBody>
        </Card>
      )}

      {/* Modal para invitar cuidador */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invitar Nuevo Cuidador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email del cuidador</FormLabel>
                <Input
                  type="email"
                  value={invitationForm.email}
                  onChange={(e) =>
                    setInvitationForm({ ...invitationForm, email: e.target.value })
                  }
                  placeholder="cuidador@ejemplo.com"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Relación con el paciente</FormLabel>
                <Select
                  value={invitationForm.relationship}
                  onChange={(e) =>
                    setInvitationForm({ ...invitationForm, relationship: e.target.value })
                  }
                  placeholder="Selecciona la relación"
                >
                  <option value="hijo">Hijo/Hija</option>
                  <option value="esposo">Esposo/Esposa</option>
                  <option value="hermano">Hermano/Hermana</option>
                  <option value="padre">Padre/Madre</option>
                  <option value="cuidador">Cuidador profesional</option>
                  <option value="amigo">Amigo/Amiga</option>
                  <option value="otro">Otro</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Mensaje personal (opcional)</FormLabel>
                <Textarea
                  value={invitationForm.message}
                  onChange={(e) =>
                    setInvitationForm({ ...invitationForm, message: e.target.value })
                  }
                  placeholder="Escribe un mensaje personal para el cuidador..."
                  rows={3}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="orange" onClick={handleSendInvitation}>
              Enviar Invitación
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
