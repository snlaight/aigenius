import { SignIn } from '@clerk/nextjs';

const SignInPage = () => (
  <main className='flex min-h-screen flex-col items-center justify-center'>
    <SignIn />
  </main>
);

export default SignInPage;
