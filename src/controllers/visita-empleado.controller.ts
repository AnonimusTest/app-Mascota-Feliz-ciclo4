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
  Empleado,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaEmpleadoController {
  constructor(
    @repository(VisitaRepository)
    public visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Visita.prototype.id,
  ): Promise<Empleado> {
    return this.visitaRepository.empleado(id);
  }
}
