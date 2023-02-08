import { VStack, Heading, ScaleFade } from "@chakra-ui/react";
import { useState } from "react";

import RegisterForm from "@/components/Organisms/RegisterForm";
import OtpForm from "@/components/Organisms/OtpForm";
import RegisterSuccess from "@/components/Organisms/RegisterSuccess";
import Layout from "@/components/Template/Layout";

import type { FC } from "react";
import type { PageMode } from "@/interfaces/registration";

const RegistrationPage: FC = () => {
  const [pageMode, setPageMode] = useState<PageMode>("register");

  return (
    <Layout title="Register">
      <VStack
        gap={4}
        maxW="31rem"
        margin="0 auto"
        padding={{
          base: "3rem 2rem",
          md: "0 0 3rem",
        }}
      >
        <Heading
          fontWeight="bold"
          fontSize={{
            base: "2rem",
            md: "5xl",
          }}
          color="brand.green"
          w="full"
          lineHeight={{ base: "2.75rem", md: "4.125rem" }}
        >
          {pageMode === "success" ? "Registration Success!!" : "Registration"}
        </Heading>
        <ScaleFade
          unmountOnExit
          initialScale={0.9}
          in={pageMode === "register"}
        >
          <RegisterForm setPageMode={setPageMode} />
        </ScaleFade>
        <ScaleFade unmountOnExit initialScale={0.9} in={pageMode === "otp"}>
          <OtpForm setPageMode={setPageMode} />
        </ScaleFade>
        <ScaleFade unmountOnExit initialScale={0.9} in={pageMode === "success"}>
          <RegisterSuccess />
        </ScaleFade>
      </VStack>
    </Layout>
  );
};

export default RegistrationPage;
