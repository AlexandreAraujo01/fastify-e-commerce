export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <main className="bg-zinc-950 h-dvh w-full flex flex-col justify-center items-center">{children}</main>
  );
}
