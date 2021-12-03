import React, { useEffect, useState } from 'react';

interface ClientPrincipal {
  identityProvider: string;
  userId: string;
  userDetails: string;
  userRoles: string[];
}

export const User = () => {
  const [userInfo, setUserInfo] = useState<ClientPrincipal | undefined>();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo(): Promise<ClientPrincipal | undefined> {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  return (
    <div>
      <p>
        <a href="/login?post_login_redirect_uri=/admin">Login</a>, <a href="/logout?post_logout_redirect_uri=/">Logout</a>
      </p>
    {userInfo && (
      <div>
        <div className="user">
          <p>Welcome</p>
          <p>User name: {userInfo.userDetails}, Provider: {userInfo.identityProvider}</p>
          <p>Roles: {userInfo.userRoles.join(", ")}, userId: {userInfo.userId}</p>
        </div>
      </div>)}
      </div>
  );
}
