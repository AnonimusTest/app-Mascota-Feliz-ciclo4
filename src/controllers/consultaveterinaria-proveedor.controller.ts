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
  Proveedor,
} from '../models';
import {ConsultaveterinariaRepository} from '../repositories';

export class ConsultaveterinariaProveedorController {
  constructor(
    @repository(ConsultaveterinariaRepository)
    public consultaveterinariaRepository: ConsultaveterinariaRepository,
  ) { }

  @get('/consultaveterinarias/{id}/proveedor', {
    responses: {
      '200': {
        description: 'Proveedor belonging to Consultaveterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async getProveedor(
    @param.path.string('id') id: typeof Consultaveterinaria.prototype.id,
  ): Promise<Proveedor> {
    return this.consultaveterinariaRepository.proveedor(id);
  }
}
