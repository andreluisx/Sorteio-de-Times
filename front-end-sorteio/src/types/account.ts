export type UserData = {
  name?: string;
  email: string;
  emailVerified: boolean;
  isPremium: boolean;
  notificationsEnabled: boolean;
  twoFactorAuth: boolean;
};

export type NavItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

export type AccountTabProps = {
  userData: UserData;
  setUserData?: React.Dispatch<React.SetStateAction<UserData>>;
  status?: "authenticated" | "loading" | "unauthenticated";
};

export type Plan = {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  recommended?: boolean;
  bestValue?: boolean;
};