import React, { useState } from "react";
import { Box, Button, VStack, HStack, Text, Progress, useToast } from "@chakra-ui/react";
import { FaPizzaSlice, FaTruck, FaBell, FaCheckCircle } from "react-icons/fa";

const stages = ["Realización", "Preparación", "Envío", "Entrega"];

const Index = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [times, setTimes] = useState({
    realization: { estimated: 5, real: null },
    preparation: { estimated: 15, real: null },
    shipping: { estimated: 10, real: null },
    delivery: { estimated: 5, real: null },
  });
  const toast = useToast();

  const placeOrder = () => {
    // Start the order process
    setCurrentStage(1);
    toast({
      title: "Pedido realizado.",
      description: "Hemos recibido tu pedido y estamos trabajando en él.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    // Play a sound
    const audio = new Audio("/order-sound.mp3"); // Replace with actual sound file path
    audio.play();
  };

  const advanceStage = () => {
    if (currentStage < stages.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  const OrderStage = ({ stage, index }) => {
    const isCurrent = index === currentStage;
    const isPast = index < currentStage;
    const Icon = [FaPizzaSlice, FaBell, FaTruck, FaCheckCircle][index];

    return (
      <HStack spacing={4}>
        <Icon color={isCurrent ? "green.500" : "gray.300"} />
        <VStack align="start">
          <Text fontWeight={isCurrent ? "bold" : "normal"}>{stage}</Text>
          <Text fontSize="sm">
            Estimado: {times[stage.toLowerCase()].estimated} min
            {times[stage.toLowerCase()].real && `, Real: ${times[stage.toLowerCase()].real} min`}
          </Text>
        </VStack>
      </HStack>
    );
  };

  return (
    <Box p={5}>
      <VStack spacing={5}>
        <Text fontSize="2xl" fontWeight="bold">
          Seguimiento de tu Pizza
        </Text>
        {stages.map((stage, index) => (
          <OrderStage key={stage} stage={stage} index={index} />
        ))}
        <Progress value={(currentStage / stages.length) * 100} size="lg" colorScheme="green" />
        <Button leftIcon={<FaPizzaSlice />} colorScheme="green" onClick={placeOrder}>
          Realizar Pedido
        </Button>
        <Button leftIcon={<FaCheckCircle />} colorScheme="blue" onClick={advanceStage}>
          Siguiente Fase
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
