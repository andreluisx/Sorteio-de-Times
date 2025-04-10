"use client";

import { useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import AccountMobileMenu from "@/components/account/AccountMobileMenu";
import { UserData } from "@/types/account";
import ProfileTab from '@/components/account/ProfileTab';
import SettingsTab from '@/components/account/SettingsTab';
import AccountSidebar from '@/components/account/AccountSideBar';
import PremiumTab from '@/components/account/PremiumTab';
import DeleteAccountTab from '@/components/account/DeleteAccountTab';
import { useSession } from 'next-auth/react';

export default function AccountPage() {
  const { data } = useSession();
  const [activeTab, setActiveTab] = useState<string>("meus-dados");
  const [userData, setUserData] = useState<UserData>({
    email: data?.user?.email ?? 'example@email.com',
    avatar: "/tutorial/user.png",
    emailVerified: false,
    premiumMember: false,
    notificationsEnabled: true,
    twoFactorAuth: false
  });

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