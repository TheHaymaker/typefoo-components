import Image from "next/image";
import { FirstComponent } from "@/src";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FirstComponent formAction='dfd' href="/" variant='solid'>
        hello there
      </FirstComponent>
    </main>
  );
}
