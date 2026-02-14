const FILTER_OFF = "filter_off";

const GENDERS = [
  { value: 1, label: "Male" },
  { value: 2, label: "Female" },
];

const VERIFIED = [
  { value: FILTER_OFF, label: "-" },
  { value: "0", label: "No" },
  { value: "1", label: "Yes" },
];

const STATUS_OPTIONS = [
  { value: FILTER_OFF, label: "-" },
  { value: "0", label: "Inactive" },
  { value: "1", label: "Active" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
];

export const GENERAL = { GENDERS, VERIFIED, FILTER_OFF, LANGUAGES, STATUS_OPTIONS };
