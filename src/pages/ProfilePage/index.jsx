import React, { useEffect, useState } from 'react';

import PageTitle from '../../components/PageTitle';
import ClientInfo from '../../components/ClientInfo';

import api from '../../api';

const ProfilePage = () => {
  const [clientInfo, setClientInfo] = useState(null);

  useEffect(() => {
    const getClientInfo = async () => {
      const info = await api.getProfileInfo();
      setClientInfo(info);
    };
    getClientInfo();
  }, []);

  return (
    <>
      <PageTitle>Profile Page</PageTitle>
      {!!clientInfo && <ClientInfo info={clientInfo} />}
    </>
  );
};

export default ProfilePage;
