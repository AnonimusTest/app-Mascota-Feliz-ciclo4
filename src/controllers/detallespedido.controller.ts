import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Detallespedido} from '../models';
import {DetallespedidoRepository} from '../repositories';

export class DetallespedidoController {
  constructor(
    @repository(DetallespedidoRepository)
    public detallespedidoRepository : DetallespedidoRepository,
  ) {}

  @post('/detallespedidos')
  @response(200, {
    description: 'Detallespedido model instance',
    content: {'application/json': {schema: getModelSchemaRef(Detallespedido)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {
            title: 'NewDetallespedido',
            exclude: ['id'],
          }),
        },
      },
    })
    detallespedido: Omit<Detallespedido, 'id'>,
  ): Promise<Detallespedido> {
    return this.detallespedidoRepository.create(detallespedido);
  }

  @get('/detallespedidos/count')
  @response(200, {
    description: 'Detallespedido model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Detallespedido) where?: Where<Detallespedido>,
  ): Promise<Count> {
    return this.detallespedidoRepository.count(where);
  }

  @get('/detallespedidos')
  @response(200, {
    description: 'Array of Detallespedido model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Detallespedido, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Detallespedido) filter?: Filter<Detallespedido>,
  ): Promise<Detallespedido[]> {
    return this.detallespedidoRepository.find(filter);
  }

  @patch('/detallespedidos')
  @response(200, {
    description: 'Detallespedido PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {partial: true}),
        },
      },
    })
    detallespedido: Detallespedido,
    @param.where(Detallespedido) where?: Where<Detallespedido>,
  ): Promise<Count> {
    return this.detallespedidoRepository.updateAll(detallespedido, where);
  }

  @get('/detallespedidos/{id}')
  @response(200, {
    description: 'Detallespedido model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Detallespedido, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Detallespedido, {exclude: 'where'}) filter?: FilterExcludingWhere<Detallespedido>
  ): Promise<Detallespedido> {
    return this.detallespedidoRepository.findById(id, filter);
  }

  @patch('/detallespedidos/{id}')
  @response(204, {
    description: 'Detallespedido PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detallespedido, {partial: true}),
        },
      },
    })
    detallespedido: Detallespedido,
  ): Promise<void> {
    await this.detallespedidoRepository.updateById(id, detallespedido);
  }

  @put('/detallespedidos/{id}')
  @response(204, {
    description: 'Detallespedido PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() detallespedido: Detallespedido,
  ): Promise<void> {
    await this.detallespedidoRepository.replaceById(id, detallespedido);
  }

  @del('/detallespedidos/{id}')
  @response(204, {
    description: 'Detallespedido DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detallespedidoRepository.deleteById(id);
  }
}
