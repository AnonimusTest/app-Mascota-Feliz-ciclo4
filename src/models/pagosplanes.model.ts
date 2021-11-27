import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Plan} from './plan.model';
import {Visita} from './visita.model';

@model()
export class Pagosplanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fechapago: string;

  @property({
    type: 'string',
    required: true,
  })
  formapago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  @belongsTo(() => Plan)
  planId: string;

  @hasMany(() => Visita)
  visitas: Visita[];

  constructor(data?: Partial<Pagosplanes>) {
    super(data);
  }
}

export interface PagosplanesRelations {
  // describe navigational properties here
}

export type PagosplanesWithRelations = Pagosplanes & PagosplanesRelations;
