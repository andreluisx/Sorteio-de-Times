"use client";

import { useEffect, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import AccountMobileMenu from "@/components/account/AccountMobileMenu";
import { UserData } from "@/types/account";
import ProfileTab from '@/components/account/ProfileTab';
import SettingsTab from '@/components/account/SettingsTab';
import AccountSidebar from '@/components/account/AccountSideBar';
import PremiumTab from '@/components/account/PremiumTab';
import DeleteAccountTab from '@/components/account/DeleteAccountTab';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useUsersStore } from '@/store/user';

export default function AccountPage() {
  const { data, status } = useSession();
  const router = useRouter();
  const { checkUser, user } = useUsersStore();
  const [activeTab, setActiveTab] = useState<string>("meus-dados");
  const [userData, setUserData] = useState<UserData>({
    email: data?.user?.email ?? 'example@email.com',
    avatar: "/tutorial/user.png",
    emailVerified: false,
    premiumMember: false,
    notificationsEnabled: true,
    twoFactorAuth: false
  });

  useEffect(()=>{
    checkUser()
    if(user === null){
      redirect('/auth/login')
    }
  }, [])

  

  const renderTabContent = () => {
    switch (activeTab) {
      case "meus-dados":
        return <ProfileTab userData={userData} setUserData={setUserData} />;
      case "configuracoes":
        return <SettingsTab userData={userData} setUserData={setUserData} />;
      case "premium":
        return <PremiumTab userData={userData} />;
      case "deletar-conta":
        return <DeleteAccountTab />;
      default:
        return null;
    }
  };

  return (
    <AccountLayout
      sidebar={
        <AccountSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userData={userData}
        />
      }
      mobileMenu={
        <AccountMobileMenu 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
      }
    >
      {renderTabContent()}
    </AccountLayout>
  );
}