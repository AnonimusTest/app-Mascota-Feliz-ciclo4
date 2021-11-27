import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pagosplanes} from './pagosplanes.model';
import {Empleado} from './empleado.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'date',
    required: true,
  })
  horainicio: string;

  @property({
    type: 'date',
    required: true,
  })
  horafin: string;

  @property({
    type: 'date',
    required: true,
  })
  edadmascota: string;

  @belongsTo(() => Pagosplanes)
  pagosplanesId: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
