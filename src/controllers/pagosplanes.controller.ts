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
import {Pagosplanes} from '../models';
import {PagosplanesRepository} from '../repositories';

export class PagosplanesController {
  constructor(
    @repository(PagosplanesRepository)
    public pagosplanesRepository : PagosplanesRepository,
  ) {}

  @post('/pagosplanes')
  @response(200, {
    description: 'Pagosplanes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pagosplanes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {
            title: 'NewPagosplanes',
            exclude: ['id'],
          }),
        },
      },
    })
    pagosplanes: Omit<Pagosplanes, 'id'>,
  ): Promise<Pagosplanes> {
    return this.pagosplanesRepository.create(pagosplanes);
  }

  @get('/pagosplanes/count')
  @response(200, {
    description: 'Pagosplanes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pagosplanes) where?: Where<Pagosplanes>,
  ): Promise<Count> {
    return this.pagosplanesRepository.count(where);
  }

  @get('/pagosplanes')
  @response(200, {
    description: 'Array of Pagosplanes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pagosplanes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pagosplanes) filter?: Filter<Pagosplanes>,
  ): Promise<Pagosplanes[]> {
    return this.pagosplanesRepository.find(filter);
  }

  @patch('/pagosplanes')
  @response(200, {
    description: 'Pagosplanes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {partial: true}),
        },
      },
    })
    pagosplanes: Pagosplanes,
    @param.where(Pagosplanes) where?: Where<Pagosplanes>,
  ): Promise<Count> {
    return this.pagosplanesRepository.updateAll(pagosplanes, where);
  }

  @get('/pagosplanes/{id}')
  @response(200, {
    description: 'Pagosplanes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pagosplanes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pagosplanes, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagosplanes>
  ): Promise<Pagosplanes> {
    return this.pagosplanesRepository.findById(id, filter);
  }

  @patch('/pagosplanes/{id}')
  @response(204, {
    description: 'Pagosplanes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {partial: true}),
        },
      },
    })
    pagosplanes: Pagosplanes,
  ): Promise<void> {
    await this.pagosplanesRepository.updateById(id, pagosplanes);
  }

  @put('/pagosplanes/{id}')
  @response(204, {
    description: 'Pagosplanes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagosplanes: Pagosplanes,
  ): Promise<void> {
    await this.pagosplanesRepository.replaceById(id, pagosplanes);
  }

  @del('/pagosplanes/{id}')
  @response(204, {
    description: 'Pagosplanes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagosplanesRepository.deleteById(id);
  }
}
