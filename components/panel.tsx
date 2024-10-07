export const Panel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="panel bg-default-300 min-width-300 rounded p-4">
      {children}
    </div>
  );
};
