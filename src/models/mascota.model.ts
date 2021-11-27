import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Consultaveterinaria} from './consultaveterinaria.model';
import {Pagosplanes} from './pagosplanes.model';
import {Empleado} from './empleado.model';

@model()
export class Mascota extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @property({
    type: 'string',
    required: true,
  })
  motivoinactivo: string;

  @property({
    type: 'string',
    required: true,
  })
  especie: string;

  @property({
    type: 'string',
    required: true,
  })
  raza: string;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sexo: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fechanacimiento: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @hasMany(() => Consultaveterinaria)
  consultaveterinarias: Consultaveterinaria[];

  @hasMany(() => Pagosplanes)
  pagosplanes: Pagosplanes[];

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;
