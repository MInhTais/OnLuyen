export interface City {
  id:string,
  name:string
}

export interface Districts {
  id:string,
  name:string,
  city_id:string
}

export interface Wards {
  id:string,
  name:string,
  district_id:string
}

export interface RateRequest {
  shipment: {
    address_from: {
        city: string;
        district: string;
    };
    address_to: {
        city: string;
        district: string;
    },
    parcel: {
      cod: string;
      weight: string;
      width: string;
      height: string;
      length: string;
  };
  }
}

export interface RateResponse {
  id: string;
  carrier_name: string;
  carrier_logo: string;
  carrier_short_name: string;
  service: string;
  expected: string;
  is_apply_only: boolean;
  promotion_id: number;
  discount: number;
  weight_fee: number;
  location_first_fee: number;
  location_step_fee: number;
  remote_area_fee: number;
  oil_fee: number;
  location_fee: number;
  cod_fee: number;
  service_fee: number;
  total_fee: number;
  total_amount: number;
  total_amount_carrier: number;
  total_amount_shop: number;
  price_table_id: number;
  insurrance_fee: number;
  return_fee: number;
  report: {
      avg_time_delivery: number;
      avg_time_delivery_format: number;
  };
}

