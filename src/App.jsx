import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import MainPage from "./pages"
import { system } from "@chakra-ui/react/preset";

function App() {

  return (
    <ChakraProvider value={system}>
      <MainPage />
    </ChakraProvider>
  )
}

export default App