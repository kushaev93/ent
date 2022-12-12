export interface IPage {
  id: number
  image_file: string
  meta_description: string
  meta_title: string
  name: string
  url: string
  status: number
  imageFile: Array<Record<string, string>>
  updated_at: number
  type?: string
  category_url?: string
  category_name?: string
  price?: string
  vendor_code?: string
  short_description?: string
  short_desc?: string
  valute?: string
  opt_price?: string
  blocks: Array<{
    id: number
    name: string
    settings: {
      id: number
    }
  }>
}

export interface Category {
  id: number
  meta_description: string
  meta_title: string
  name: string
  url: string
  imageFile: Array<Record<string, string>>
  blocks?: Array<{
    id: number
    name: string
    settings: {
      id: number
    }
  }>
}

export interface CategoryChild {
  name: string
  id: number
  url: string
}

// Navigation interfaces

interface Socials {
  telegram: string
  vk: string
  whatsapp: string
  youtube: string
}

export interface Settings {
  about_text: string
  additional_contact: Array<Record<string, string>>
  company_address: string
  company_city: string
  company_index: string
  company_name: string
  company_office: string
  company_phones: Array<string>
  company_street: string
  current_valute: string
  email: string
  id: number
  logo_id: string
  map_marker: Array<string>
  order_emails: Array<string>
  price_percent: number
  socials: Socials
  work_hours: string
  logo: Record<string, string>
}

export interface NavLink {
  id: number
  name: string
  target_blank: number
  url: string
  children?: Array<Record<string, unknown>>
}

export interface Navigation {
  navbar: Array<NavLink>
  footer: Array<NavLink>
  settings: Settings
}

export interface ICartItem {
  id: number
  additionalImagesFiles: Array<Record<string, unknown>>
  blocks: Array<Record<string, unknown>>
  category_id: number
  category_name: string
  category_url: string
  composition: string
  count: number
  description: string
  imageFile: Record<string, unknown>
  image_web: string
  meta_description: string
  meta_title: string
  min_price: number
  name: string
  pdfFile: string
  price: string
  url: string
  tags: Array<Record<string, unknown>>
  vendor_code: string
  hc_code: string
  valute: string
  opt_price: string
  in_stock: {
    is: boolean
    count: number
  }
}
export interface IOrder {
  method: string
  to: string
  address: string
  deliveryPrice: boolean
  name: string
  number: string
  user: string
}

export interface ICartErrors {
  errors: Record<string, unknown>
}
