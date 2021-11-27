import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pedido} from './pedido.model';
import {Producto} from './producto.model';

@model()
export class Detallespedido extends Entity {
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

  @belongsTo(() => Pedido)
  pedidoId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<Detallespedido>) {
    super(data);
  }
}

export interface DetallespedidoRelations {
  // describe navigational properties here
}

export type DetallespedidoWithRelations = Detallespedido & DetallespedidoRelations;
