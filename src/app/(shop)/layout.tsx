import { Category } from "@/src/components/layout/categories/Categories";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      {/* These stay outside the main container to allow full-width backgrounds */}
      
      <Category />

      {/* This container centers your product grid and pages */}
      <main className="flex-1 w-full max-w-360 mx-auto px-4 lg:px-10 py-4">
        {children}
      </main>

      {/* Footer would go here later */}
    </section>
  );
}
