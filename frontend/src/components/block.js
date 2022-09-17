import React, { useState } from "react";
import { Text, Textarea, VStack, Box, StackDivider } from "@chakra-ui/react";

function Example() {
   let [value, setValue] = React.useState("");

   let handleInputChange = (e) => {
      let inputValue = e.target.value;
      setValue(inputValue);
   };
   return (
      <div className="container_area">
         <Textarea
            className="area"
            value={value}
            onChange={handleInputChange}
            placeholder="Here is a sample placeholder"
         />

         <VStack className="head" divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
            <Box h="40px" bg="yellow.200">
               Matematika
            </Box>
           
         </VStack>
      </div>
   );
}
export default Example;
