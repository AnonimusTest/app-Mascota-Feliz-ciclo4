import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Empleado,
  Mascota,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoMascotaController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Empleado.prototype.id,
  ): Promise<Mascota> {
    return this.empleadoRepository.mascota(id);
  }
}
