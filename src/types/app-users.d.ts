export type AppUserType = {
  id: number;
  name: string;
  user_type: number;
  phone: string;
  production: string;
  status_name: string;
  badge_name: string;
  region_name: string;
  city_name: string;
  address: string;

  // The password field is hashed, but structurally it is a string.
  password: string;

  email: string;

  // Fields that are nullable (can be string or null)
  region: string | null;
  country: string | null;
  district: string | null;
  city: string | null;
  address: string | null;
  last_location_coordinate: string | null;
  app_version: string | null;
  last_active_at: string | null;
  migrated_at: string | null;
  deleted_at: string | null;
  verification_code: string | null;
  date_of_birth: string | null;
  facebook_id: string | null;
  facebook_token: string | null;
  apple_id: string | null;
  apple_token: string | null;
  employer_id: number | null;
  weather_location_id: number | null;
  ban_to: string | null;
  pcode: string | null;
  referral_number: string | null;
  avaliable_badges: string | null;
  state_pcode: string | null;
  ts_pcode: string | null;
  deleted_reasons: string | null;

  // Other defined fields
  badge: number;
  profile_image: string;
  status: number;
  is_private: 0 | 1; // Generally used as boolean (0/1) in APIs
  points: number;
  created_at: string; // ISO 8601 Date String
  updated_at: string; // ISO 8601 Date String
  verified: 0 | 1;
  gender: number;
  is_v1_user: 0 | 1;
  v1_user_id: number;

  // Boolean fields
  allow_comment: boolean;
  allow_content: boolean;
  allow_like: boolean;
};
