export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_image: string | null;
  account_type: number;
  app_user_id: number;
  role: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  last_active_at: string | null;
};

export type AuthResponseType = {
  access_token: string;
  expires_in: number;
  organizations: any[];
  permissions: string[];
  status: string;
  user: User;
};
