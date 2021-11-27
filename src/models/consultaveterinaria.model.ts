import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Mascota} from './mascota.model';

@model()
export class Consultaveterinaria extends Entity {
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
  fechasolicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaconsulta: string;

  @property({
    type: 'boolean',
    required: true,
  })
  pagado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @belongsTo(() => Mascota)
  mascotaId: string;

  constructor(data?: Partial<Consultaveterinaria>) {
    super(data);
  }
}

export interface ConsultaveterinariaRelations {
  // describe navigational properties here
}

export type ConsultaveterinariaWithRelations = Consultaveterinaria & ConsultaveterinariaRelations;
