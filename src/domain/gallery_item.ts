export type CustomerType = '전체' | '신부' | '신랑' | '혼주' | '하객';

export const CUSTOMER_TYPES: CustomerType[] = ['전체', '신부', '신랑', '혼주', '하객'];

export interface GalleryItem {
  // id: number | string;
  date: string;
  // gubun: string | null;
  customer_type: string; // e.g '신부, 혼주'
  display_code: string; // e.g A220
  views: number;
  unavailable: boolean;
  hanbok_name1: string;
  hanbok_name2: string;
  hanbok_name3: string;
  hanbok_name4: string;
  hanbok_name5: string;
  available_size: string;
  hanbok_maker1: string;
  hanbok_maker2: string;
  hanbok_maker3: string;
  hanbok_maker4: string;
  hanbok_maker5: string;
  hanbok_barcode1: string;
  hanbok_barcode2: string;
  hanbok_barcode3: string;
  hanbok_barcode4: string;
  hanbok_barcode5: string;
  hanbok_type1: string;
  hanbok_type2: string;
  hanbok_type3: string;
  hanbok_type4: string;
  hanbok_type5: string;
  _contract_date: string;
  _event_date: string;
  _return_date: string;
  _rental_date: string;
}

