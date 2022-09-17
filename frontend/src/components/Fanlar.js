import React from "react";
import { VStack, Box, StackDivider } from "@chakra-ui/react";

export const Fanlar = () => {
   return (
      <div className="container_card">
         <div className="cart">
            {" "}
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
               <Box h="40px" bg="yellow.200">
                  Matematika
               </Box>
               <Box h="40px" bg="yellow.200">
                  Ingliz Tili
               </Box>
               <Box h="40px" bg="yellow.200">
                  Fizika
               </Box>
            </VStack>
         </div>

         <div className="cart">
            {" "}
            <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
               <Box h="40px" bg="yellow.200">
                  To'plamlar
               </Box>
               <Box h="40px" bg="yellow.200">
                  Kasr Sonlar
               </Box>
               <Box h="40px" bg="yellow.200">
                  arifmetik progressiya
               </Box>
            </VStack>
         </div>
      </div>
   );
};
