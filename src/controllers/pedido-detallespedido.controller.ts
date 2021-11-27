import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Detallespedido,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoDetallespedidoController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido has many Detallespedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detallespedido)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detallespedido>,
  ): Promise<Detallespedido[]> {
    return this.pedidoRepository.detallespedidos(id).find(filter);
  }

  @post('/pedidos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallespedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {
            title: 'NewDetallespedidoInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) detallespedido: Omit<Detallespedido, 'id'>,
  ): Promise<Detallespedido> {
    return this.pedidoRepository.detallespedidos(id).create(detallespedido);
  }

  @patch('/pedidos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Pedido.Detallespedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {partial: true}),
        },
      },
    })
    detallespedido: Partial<Detallespedido>,
    @param.query.object('where', getWhereSchemaFor(Detallespedido)) where?: Where<Detallespedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallespedidos(id).patch(detallespedido, where);
  }

  @del('/pedidos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Pedido.Detallespedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallespedido)) where?: Where<Detallespedido>,
  ): Promise<Count> {
    return this.pedidoRepository.detallespedidos(id).delete(where);
  }
}
