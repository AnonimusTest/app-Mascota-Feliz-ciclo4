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
  Plan,
  Pagosplanes,
} from '../models';
import {PlanRepository} from '../repositories';

export class PlanPagosplanesController {
  constructor(
    @repository(PlanRepository) protected planRepository: PlanRepository,
  ) { }

  @get('/plans/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Array of Plan has many Pagosplanes',
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
    return this.planRepository.pagosplanes(id).find(filter);
  }

  @post('/plans/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Plan model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pagosplanes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plan.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagosplanes, {
            title: 'NewPagosplanesInPlan',
            exclude: ['id'],
            optional: ['planId']
          }),
        },
      },
    }) pagosplanes: Omit<Pagosplanes, 'id'>,
  ): Promise<Pagosplanes> {
    return this.planRepository.pagosplanes(id).create(pagosplanes);
  }

  @patch('/plans/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Plan.Pagosplanes PATCH success count',
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
    return this.planRepository.pagosplanes(id).patch(pagosplanes, where);
  }

  @del('/plans/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Plan.Pagosplanes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pagosplanes)) where?: Where<Pagosplanes>,
  ): Promise<Count> {
    return this.planRepository.pagosplanes(id).delete(where);
  }
}
