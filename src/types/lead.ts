export interface LeadFormData {
  name: string
  email: string
  debtAmount?: string
  message?: string
  consent: boolean
  website?: string
}

export interface LeadSubmissionResponse {
  success: boolean
  message: string
  error?: string
}
