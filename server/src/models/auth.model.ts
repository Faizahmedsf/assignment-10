import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'auth'
})
export class Auth extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  password?: string;


  constructor(data?: Partial<Auth>) {
    super(data);
  }
}

export interface AuthRelations {
  // describe navigational properties here
}

export type AuthWithRelations = Auth & AuthRelations;
