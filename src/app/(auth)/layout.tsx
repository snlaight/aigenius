const AuthLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <main className='h-full bg-[#111827] flex items-center justify-center'>
    {children}
  </main>
);

export default AuthLayout;
