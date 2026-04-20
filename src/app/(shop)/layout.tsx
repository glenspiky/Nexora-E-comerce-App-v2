import { Category } from "@/src/components/layout/categories/Categories";
import Navbar from "@/src/components/layout/navbar/Navbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Navbar will go here later */}
      <Navbar></Navbar>
<Category></Category>
      <main>{children}</main>
    </section>
  );
}
