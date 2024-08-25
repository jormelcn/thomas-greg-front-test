export interface ApiConfig {
  baseUrl: string,
  apiKey?: string,
  authProvider?: () => (string | null),
  includeQuery?: { [key: string]: string },
  credentials?: 'include' | 'omit' | 'same-origin'
}

