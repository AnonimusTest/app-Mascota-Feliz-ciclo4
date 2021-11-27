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
  Mascota,
  Pagosplanes,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaPagosplanesController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Pagosplanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagosplanes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pagosplanes>,
  ): Promise<Pagosplanes[]> {
    return this.mascotaRepository.pagosplanes(id).find(filter);
  }

  @post('/mascotas/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagosplanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {
            title: 'NewPagosplanesInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) pagosplanes: Omit<Pagosplanes, 'id'>,
  ): Promise<Pagosplanes> {
    return this.mascotaRepository.pagosplanes(id).create(pagosplanes);
  }

  @patch('/mascotas/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Mascota.Pagosplanes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {partial: true}),
        },
      },
    })
    pagosplanes: Partial<Pagosplanes>,
    @param.query.object('where', getWhereSchemaFor(Pagosplanes)) where?: Where<Pagosplanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosplanes(id).patch(pagosplanes, where);
  }

  @del('/mascotas/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Mascota.Pagosplanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pagosplanes)) where?: Where<Pagosplanes>,
  ): Promise<Count> {
    return this.mascotaRepository.pagosplanes(id).delete(where);
  }
}
