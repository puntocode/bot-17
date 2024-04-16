export interface IntegrationsPaginated {
  data:       Integration[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

export interface Integration {
  state_id?:                   number;
  agentName?:                  string;
  integrationTypeId:           number | null;
  integrationTypeDescription?: string;
  id?:                         number;
  name:                        string;
  agentId:                     number | null;
  state?:                      string;
  urlWS:                       string;
  isDeleting?:                 boolean;
  integrationData?:            any[];
}

export interface IntegrationTypes {
  id:          number;
  description: string;
}

export interface Response {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}
