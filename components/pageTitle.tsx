export const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* title() = class="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9" */}
      {/* <h1 className="font-semibold text-[2em] leading-9 mb-4">➡ {children}</h1> */}
      <h1 className="font-semibold text-[2em] leading-9 mb-4">▸ {children}</h1>
    </div>
  );
};
