import Menu from "@/components/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full gap-[20px]">
      <Menu />
      {children}
    </div>
  );
}
