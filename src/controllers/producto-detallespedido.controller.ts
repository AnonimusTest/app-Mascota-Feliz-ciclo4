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
  Producto,
  Detallespedido,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetallespedidoController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Array of Producto has many Detallespedido',
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
    return this.productoRepository.detallespedidos(id).find(filter);
  }

  @post('/productos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detallespedido)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {
            title: 'NewDetallespedidoInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detallespedido: Omit<Detallespedido, 'id'>,
  ): Promise<Detallespedido> {
    return this.productoRepository.detallespedidos(id).create(detallespedido);
  }

  @patch('/productos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Producto.Detallespedido PATCH success count',
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
    return this.productoRepository.detallespedidos(id).patch(detallespedido, where);
  }

  @del('/productos/{id}/detallespedidos', {
    responses: {
      '200': {
        description: 'Producto.Detallespedido DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detallespedido)) where?: Where<Detallespedido>,
  ): Promise<Count> {
    return this.productoRepository.detallespedidos(id).delete(where);
  }
}
