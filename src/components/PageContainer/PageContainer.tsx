import { Container } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PageContainer = ({ children }: Props) => {
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      {children}
    </Container>
  );
};
