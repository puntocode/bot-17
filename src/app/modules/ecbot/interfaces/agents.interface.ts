import { Company } from "./company.interface";
import { State } from "./state.interface";

export interface AgentList {
  id:   number;
  name: string;
}

export interface AgentTypes {
  id:   number;
  type: string;
}

export interface AgentPersonalities {
  id:          number;
  personality: string;
}

export interface AgentsPaginated {
  data:       Agent[];
  total:      number;
  page:       number;
  limit:      number;
  totalPages: number;
}

export interface Agent {
  additionalInformation: string;
  company?:              Company;
  companyId:             number | null;
  createdAt?:            Date;
  doNotSay:              string;
  id?:                   number;
  name:                  string;
  notToTalkAbout:        string;
  personality?:          AgentPersonalities;
  personalityId:         number | null;
  state?:                State;
  stateId:               number;
  type?:                 AgentTypes;
  typeId:                number | null;
  updatedAt?:            Date;
  isDeleting?:           boolean;
}
