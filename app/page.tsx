import Image from "next/image";

export default function Home() {
  return (
    <div className="m-8 mt-16 flex flex-col items-center gap-8 bg-background text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        El mejor sitio para administrar tu torneo de padel
      </h2>
      <Image
        className="h-auto w-auto rounded-lg"
        priority
        width={500}
        height={500}
        src="/img/padel-homescreen.jpeg"
        alt="torneo padel img"
      />
    </div>
  );
}
