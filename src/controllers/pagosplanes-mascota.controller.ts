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
  Mascota,
} from '../models';
import {PagosplanesRepository} from '../repositories';

export class PagosplanesMascotaController {
  constructor(
    @repository(PagosplanesRepository)
    public pagosplanesRepository: PagosplanesRepository,
  ) { }

  @get('/pagosplanes/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Pagosplanes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Pagosplanes.prototype.id,
  ): Promise<Mascota> {
    return this.pagosplanesRepository.mascota(id);
  }
}
