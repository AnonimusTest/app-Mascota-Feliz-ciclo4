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
  Proveedor,
  Consultaveterinaria,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorConsultaveterinariaController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Consultaveterinaria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Consultaveterinaria)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Consultaveterinaria>,
  ): Promise<Consultaveterinaria[]> {
    return this.proveedorRepository.consultaveterinarias(id).find(filter);
  }

  @post('/proveedors/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consultaveterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {
            title: 'NewConsultaveterinariaInProveedor',
            exclude: ['id'],
            optional: ['proveedorId']
          }),
        },
      },
    }) consultaveterinaria: Omit<Consultaveterinaria, 'id'>,
  ): Promise<Consultaveterinaria> {
    return this.proveedorRepository.consultaveterinarias(id).create(consultaveterinaria);
  }

  @patch('/proveedors/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Proveedor.Consultaveterinaria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {partial: true}),
        },
      },
    })
    consultaveterinaria: Partial<Consultaveterinaria>,
    @param.query.object('where', getWhereSchemaFor(Consultaveterinaria)) where?: Where<Consultaveterinaria>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaveterinarias(id).patch(consultaveterinaria, where);
  }

  @del('/proveedors/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Proveedor.Consultaveterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Consultaveterinaria)) where?: Where<Consultaveterinaria>,
  ): Promise<Count> {
    return this.proveedorRepository.consultaveterinarias(id).delete(where);
  }
}
