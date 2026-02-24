type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>Mi app</h1>
      {children}
    </div>
  );
};

export default Layout;
