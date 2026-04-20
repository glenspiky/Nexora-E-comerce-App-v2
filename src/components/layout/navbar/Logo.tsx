import Link from "next/link";
import Image from "next/image";
// Using the path from your current tree structure
import logoImg from "@/public/icons/nexora-pri.png";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src={logoImg}
        alt="Nexora Logo"
        width={120}
        height={70}
        className="nav-logo"
        priority
      />
    </Link>
  );
}
