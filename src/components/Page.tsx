type PagePropsType = {
  label: React.ReactNode;
  count?: number;
  children: React.ReactNode;
  openView?: boolean;
  View?: React.ReactNode;
};

export default function Page({ label, children, openView = false, View, count }: PagePropsType) {
  return (
    <div className="flex w-full gap-[20px]">
      <div className="grow h-[calc(100dvh-46px)] overflow-auto">
        <header className="flex gap-[34px] mb-[62px] font-bold">
          <div className="text-[62px] leading-[62px]">{label}</div>
          {(count !== null || count !== undefined) && (
            <div className="flex items-center justify-center border rounded-lg min-w-[60px] text-[50px] font-medium leading-[50px]">
              {count}
            </div>
          )}
        </header>
        {children}
      </div>
      {openView && View}
    </div>
  );
}
