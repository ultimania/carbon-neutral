import { signIn, signOut, useSession } from 'next-auth/react';

const AuthButtons = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn('google')}>Login with Google</button>
      ) : (
        <button onClick={() => signOut()}>Logout</button>
      )}
    </div>
  );
};

export default AuthButtons;
