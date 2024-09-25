import Link from "next/link";

import { Header } from "@/components/header";
import { buttonVariants } from "@/components/ui/button";

export default function Register() {
  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header>
        <Link
          href="/login"
          className={buttonVariants({ variant: "secondary" })}
        >
          Already have an account?
        </Link>
      </Header>

      <main></main>
    </div>
  );
}
