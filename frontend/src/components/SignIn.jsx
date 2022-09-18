import {
   Button,
   Checkbox,
   Flex,
   FormControl,
   FormLabel,
   Heading,
   Link,
   Input,
   Stack,
   Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../redux/features/authSlice";
import React, { useState, useEffect, useRef } from "react";

const initialState = {
   email: "",
   password: "",
};

export default function SplitScreen() {
   const [formValue, SetFormValue] = useState(initialState);
   const { email, password } = formValue;
   const { loading, error } = useSelector((state) => ({ ...state.auth }));
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      error && toast.error(error);
   }, [error]);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (email && password) {
         dispatch(login({ formValue, navigate, toast }));
      }

      console.log(formValue);
      SetFormValue({ ...initialState });
   };
   const onInputChange = (e) => {
      const { name, value } = e.target;
      SetFormValue({ ...formValue, [name]: value });
   };
   return (
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
         <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Stack spacing={4} w={"full"} maxW={"md"}>
               <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input
                     type="email"
                     value={email}
                     name="email"
                     autoComplete="off"
                     label="email"
                     onChange={onInputChange}
                  />
               </FormControl>
               <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input
                     type="password"
                     autoComplete="off"
                     label="password"
                     value={password}
                     name="password"
                     onChange={onInputChange}
                  />
               </FormControl>
               <Stack spacing={6}>
                  <Stack
                     direction={{ base: "column", sm: "row" }}
                     align={"start"}
                     justify={"space-between"}
                  >
                     <Checkbox>Remember me</Checkbox>
                     <Link color={"blue.500"}>Forgot password?</Link>
                  </Stack>
                  <Button onClick={handleSubmit} colorScheme={"blue"} variant={"solid"}>
                     Sign in
                  </Button>
               </Stack>
            </Stack>
         </Flex>
         <Flex flex={1}>
            <Image
               alt={"Login Image"}
               objectFit={"cover"}
               src={
                  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
               }
            />
         </Flex>
      </Stack>
   );
}
