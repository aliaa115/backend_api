export interface KeysSelect {
  table?: string;

  key?: string | string[];

  id?: string;

  campos?: string | [];

  condiciones?: string;

  incluir?: string;

  orderBy?: string;
}

export interface KeysDelete extends KeysSelect {
  state?: string;
}

export interface Condicion {}
