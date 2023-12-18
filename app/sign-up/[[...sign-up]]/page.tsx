import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mt-8 flex min-h-screen justify-center">
      <SignUp />
    </div>
  );
}
