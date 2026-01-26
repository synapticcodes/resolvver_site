export interface LeadFormData {
  name: string
  email: string
  phone: string
  debtAmount?: string
  message?: string
  consent: boolean
}

export interface LeadSubmissionResponse {
  success: boolean
  message: string
  error?: string
}
