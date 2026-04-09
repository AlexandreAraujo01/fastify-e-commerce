import MenuTopBar from "./components/menu-top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-zinc-950 h-dvh w-full">
      <MenuTopBar/>
      {children}
    </main>
  );
}
