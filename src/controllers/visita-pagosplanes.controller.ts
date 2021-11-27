import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visita,
  Pagosplanes,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaPagosplanesController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/pagosplanes', {
    responses: {
      '200': {
        description: 'Pagosplanes belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pagosplanes)},
          },
        },
      },
    },
  })
  async getPagosplanes(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Pagosplanes> {
    return this.visitaRepository.pagosplanes(id);
  }
}
