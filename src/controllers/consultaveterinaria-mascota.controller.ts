import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Consultaveterinaria,
  Mascota,
} from '../models';
import {ConsultaveterinariaRepository} from '../repositories';

export class ConsultaveterinariaMascotaController {
  constructor(
    @repository(ConsultaveterinariaRepository)
    public consultaveterinariaRepository: ConsultaveterinariaRepository,
  ) { }

  @get('/consultaveterinarias/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Consultaveterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Consultaveterinaria.prototype.id,
  ): Promise<Mascota> {
    return this.consultaveterinariaRepository.mascota(id);
  }
}
