"use client";

import { useEffect, useState } from "react";
import AccountLayout from "@/components/account/AccountLayout";
import AccountMobileMenu from "@/components/account/AccountMobileMenu";
import { UserData } from "@/types/account";
import ProfileTab from '@/components/account/ProfileTab';
import SettingsTab from '@/components/account/SettingsTab';
import AccountSidebar from '@/components/account/AccountSideBar';
import DeleteAccountTab from '@/components/account/DeleteAccountTab';
import { useSession } from 'next-auth/react';
import { useUsersStore } from '@/store/user';
import PremiumTab from '@/components/account/Premium/PremiumTab';

export default function AccountPage() {
  const {  status } = useSession();
  const { checkUser, user } = useUsersStore();
  const [activeTab, setActiveTab] = useState<string>("meus-dados");

  const [userData, setUserData] = useState<UserData>({
    email: '',
    emailVerified: false,
    isPremium: false,
    notificationsEnabled: true,
    twoFactorAuth: false
  });

  useEffect(() => {
    checkUser()
    if (user) {
      setUserData(prev => ({
        ...prev,
        email: user.email,
        isPremium: user.isPremium,
      }));
    }
  }, []);

  console.log(user)

  const renderTabContent = () => {
    switch (activeTab) {
      case "meus-dados":
        return <ProfileTab userData={user || userData} setUserData={setUserData} status={status}/>;
      case "configuracoes":
        return <SettingsTab userData={user || userData} setUserData={setUserData} />;
      case "premium":
        return <PremiumTab userData={user || userData} />;
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