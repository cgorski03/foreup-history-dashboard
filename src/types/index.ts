export interface GolferData {
  CID: string;
  person_id: string;
  course_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  birthday: string;
  address_1: string;
  city: string;
  state: string;
  zip: string;
  date_created: string;
  last_updated: string;
  logged_in: boolean;
  credit_cards: CreditCard[];
  reservations: Reservation[];
  passes: { [key: string]: Pass };
  account_transactions: any[];
  account_transactions_total: number;
  gift_cards: any[];
  rainchecks: boolean;
  invoices: any[];
  statements: any[];
  minimum_charge_transactions: any[];
  minimum_charge_totals: any[];
  booking_class_ids: number[];
  edit_hard_disabled: boolean;
  residency: any[];
}

export interface CreditCard {
  credit_card_id: string;
  course_id: string;
  customer_id: string;
  token: string;
  token_expiration: string;
  card_type: string;
  cardholder_name: string;
  expiration: string;
  masked_account: string;
  deleted: string;
  successful_charges: string;
  failed_charges: string;
  date_added: string;
}

export interface Reservation {
  TTID: string;
  teetime_id: string;
  type: string;
  start: string;
  end: string;
  allDay: string;
  holes: string;
  carts: string;
  player_count: string;
  paid_player_count: string;
  paid_carts: string;
  clubs: string;
  title: string;
  phone: string;
  email: string;
  details: string;
  side: string;
  person_id: string;
  person_name: string;
  last_updated: string;
  date_booked: string;
  date_cancelled: string;
  booking_source: string;
  booker_id: string;
  teesheet_id: string;
  teed_off_time: string;
  turn_time: string;
  finish_time: string;
  booking_class_id: string;
  course_name: string;
  course_id: string;
  teesheet_title: string;
  booking_fee_required: string;
  player_list: PlayerInfo[];
  time: string;
  purchased: boolean;
}

export interface PlayerInfo {
  person_id: string;
  person_name: string;
}

export interface Pass {
  pass_id: string;
  customer_id: string;
  start_date: string;
  end_date: string;
  is_valid: boolean;
  deleted: string;
  course_id: string;
  pass_item_id: string;
  date_created: string;
  name: string;
  description: string;
  unit_price: string;
  item_id: string;
  days_to_expiration: string | null;
  expiration_date: string;
  price_class_id: string;
  multi_customer: string;
  enroll_loyalty: string;
  renewable: string;
  minimum_term: string;
  minimum_cancel_notice: string;
  required_fields: string;
  trial_period: string;
  trial_type: string;
  min_recipient_age: string;
  max_recipient_age: string | null;
  account_limit: string;
  account_balance_allow_negative: string;
  member_account_limit: string;
  member_account_balance_allow_negative: string;
  price_class_name: string;
  date_purchased: string;
  customers: any[];
  default_price_class_id: string;
  message: string | null;
  uses: PassUse[];
  quantity: number;
  times_used: number;
  customer: {
    person_id: number;
    first_name: string;
    last_name: string;
  };
  rules: PassRule[];
  billing_would_terminate_on: string;
  next_billing_occurrence: string | null;
  would_terminate_on: string;
  item: PassItem;
}

export interface PassUse {
  pass_history_id: string;
  pass_id: string;
  type: string;
  teetime_id: string;
  sale_id: string;
  count: string;
  date_created: string;
  price_class_id: string;
  rule_id: string;
  rule_number: string;
  teesheet_id: string;
  date: string;
}

export interface PassRule {
  rule_number: number;
  name: string;
  is_valid: boolean;
  price_class_id: number;
  is_applied: boolean;
  type: string;
  items: any[];
  uniq_id: string | null;
  auto_apply: boolean;
  times_used?: number;
}

export interface PassItem {
  item_id: string;
  course_id: string;
  name: string;
  department: string;
  category: string;
  subcategory: string;
  supplier_id: string | null;
  item_number: string | null;
  description: string;
  unit_price: string;
  add_on_price: string;
  base_price: string;
  inactive: string;
  do_not_print: string;
  max_discount: string;
  inventory_level: number;
  inventory_unlimited: number;
  cost_price: string;
  is_giftcard: string;
  is_side: string;
  food_and_beverage: string;
  prompt_meal_course: string;
  number_sides: string;
  number_salads: string;
  number_soups: string;
  print_priority: string;
  is_fee: string;
  erange_size: string;
  range_servant_size: string;
  range_servant_sku: string;
  meal_course_id: string;
  taxes: any[];
  is_serialized: string;
  do_not_print_customer_receipt: string;
  unit_price_includes_tax: number;
  is_shared: string;
  gl_code: string;
  allow_alt_description: string;
  reorder_level: string;
  receipt_content_id: string | null;
  receipt_content: boolean;
  receipt_content_signature_line: string | null;
  receipt_content_separate_receipt: string | null;
  allow_duplicate_receipt_agreements: string | null;
  force_tax: string | null;
  is_service_fee: string;
  parent_item_percent: string | null;
  whichever_is: string | null;
  service_fee_id: string | null;
  button_color: string | null;
  menu_category: string | null;
  menu_subcategory: string | null;
  soup_or_salad: string;
  resident_requirement: string;
  online_purchasing: string;
  online_terms: string;
  auto_generate_giftcard_number: boolean;
  default_giftcard_expiration_days: string | null;
  promotion_id: string | null;
  upcs: any[];
  is_pass: string;
  pass_days_to_expiration: string | null;
  pass_restrictions: any[];
  pass_price_class_id: string;
  pass_expiration_date: string;
  pass_multi_customer: string;
  pass_renewable: string;
  pass_enroll_loyalty: string;
  pass_minimum_term: string;
  pass_minimum_cancel_notice: string;
  pass_required_fields: string;
  pass_trial_period: string;
  pass_trial_type: string;
  pass_min_recipient_age: string;
  pass_max_recipient_age: string | null;
  pass_account_limit: string;
  pass_member_account_limit: string;
  pass_account_balance_allow_negative: string;
  pass_member_account_balance_allow_negative: string;
  modifiers: any[];
  sides: string;
  customer_groups: any[];
  pass_groups: any[];
  pass_recurring_charges: any[];
  printer_groups: string | null;
  item_type: string;
  quantity: number;
  params: {
    customer: string;
    start_date: boolean;
    end_date: boolean;
  };
  service_fees: any[];
}

export interface ChartDataPoint {
  date: string;
  count: number;
  year?: number;
  month?: number;
  dayOfWeek?: string;
  hour?: number;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}
