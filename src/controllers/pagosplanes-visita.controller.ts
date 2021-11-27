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
  Pagosplanes,
  Visita,
} from '../models';
import {PagosplanesRepository} from '../repositories';

export class PagosplanesVisitaController {
  constructor(
    @repository(PagosplanesRepository) protected pagosplanesRepository: PagosplanesRepository,
  ) { }

  @get('/pagosplanes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Pagosplanes has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.pagosplanesRepository.visitas(id).find(filter);
  }

  @post('/pagosplanes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Pagosplanes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pagosplanes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInPagosplanes',
            exclude: ['id'],
            optional: ['pagosplanesId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.pagosplanesRepository.visitas(id).create(visita);
  }

  @patch('/pagosplanes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Pagosplanes.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.pagosplanesRepository.visitas(id).patch(visita, where);
  }

  @del('/pagosplanes/{id}/visitas', {
    responses: {
      '200': {
        description: 'Pagosplanes.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.pagosplanesRepository.visitas(id).delete(where);
  }
}
