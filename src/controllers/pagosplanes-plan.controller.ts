import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pagosplanes,
  Plan,
} from '../models';
import {PagosplanesRepository} from '../repositories';

export class PagosplanesPlanController {
  constructor(
    @repository(PagosplanesRepository)
    public pagosplanesRepository: PagosplanesRepository,
  ) { }

  @get('/pagosplanes/{id}/plan', {
    responses: {
      '200': {
        description: 'Plan belonging to Pagosplanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async getPlan(
    @param.path.string('id') id: typeof Pagosplanes.prototype.id,
  ): Promise<Plan> {
    return this.pagosplanesRepository.plan(id);
  }
}
