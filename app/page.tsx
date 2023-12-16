import Header from "@/components/Header/Header";
import Container from "@/components/ui/Container";

export default function Home() {
  console.log("heere", process.env.DATABASE_HOST);

  return (
    <Container>
      <Header />
      <div className="m-8">this is body</div>
    </Container>
  );
}
