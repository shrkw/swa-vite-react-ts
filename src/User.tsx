import React, { useState, useEffect } from 'react';

interface UserInfo {
  userDetails: string;
  identityProvider: string;
}

export const User = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo(): Promise<UserInfo | undefined> {
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
    {userInfo && (
      <div>
        <div className="user">
          <p>Welcome</p>
          <p>User name: {userInfo && userInfo.userDetails}, Provider: {userInfo && userInfo.identityProvider}</p>
        </div>
      </div>)}
      </div>
  );
}
