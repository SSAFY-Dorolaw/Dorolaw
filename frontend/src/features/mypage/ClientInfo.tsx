import apiClient from '@/shared/api/api-client';
import { Mail, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClientInfoProps {
  clientId: number;
  name: string;
  phoneNumber: string;
  email: string;
}

function ClientInfo({ clientId, name, phoneNumber, email }: ClientInfoProps) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');

        // 요청 옵션에 토큰 포함
        const userInfo = await apiClient.get('/api/members/profile', {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        console.log(userInfo.data);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchUserInfo();
  }, []);

  return (
    <div className="border-gray mx-auto mb-8 max-w-[996px] items-center rounded-[10px] border p-10 text-xl">
      <div className="flex items-center">
        <div className="mx-10 size-[100px] rounded-full bg-black"></div>
        <div>
          <h3>{name} 님 </h3>
          <h4>의뢰인_{clientId}</h4>
        </div>
      </div>
      <hr className="mt-10" />
      <div>
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Smartphone />
            <p>{phoneNumber}</p>
          </div>
          <button className="typo-button-small rounded-[10px] bg-p2 p-1 px-4">
            수정
          </button>
        </div>
        <hr className="mt-10" />
        <div className="mt-10 flex items-center gap-4">
          <Mail />
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
