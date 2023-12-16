import Header from "@/components/Header/Header";
import Container from "@/components/ui/Container";
import { useState } from "react";

export default function Home() {
  return (
    <Container>
      <Header />
      <div className="m-8">this is body</div>
    </Container>
  );
}
