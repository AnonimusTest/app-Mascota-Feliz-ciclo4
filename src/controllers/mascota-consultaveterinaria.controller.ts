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
  Consultaveterinaria,
} from '../models';
import {MascotaRepository} from '../repositories';

export class MascotaConsultaveterinariaController {
  constructor(
    @repository(MascotaRepository) protected mascotaRepository: MascotaRepository,
  ) { }

  @get('/mascotas/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Array of Mascota has many Consultaveterinaria',
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
    return this.mascotaRepository.consultaveterinarias(id).find(filter);
  }

  @post('/mascotas/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Mascota model instance',
        content: {'application/json': {schema: getModelSchemaRef(Consultaveterinaria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascota.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {
            title: 'NewConsultaveterinariaInMascota',
            exclude: ['id'],
            optional: ['mascotaId']
          }),
        },
      },
    }) consultaveterinaria: Omit<Consultaveterinaria, 'id'>,
  ): Promise<Consultaveterinaria> {
    return this.mascotaRepository.consultaveterinarias(id).create(consultaveterinaria);
  }

  @patch('/mascotas/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Mascota.Consultaveterinaria PATCH success count',
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
    return this.mascotaRepository.consultaveterinarias(id).patch(consultaveterinaria, where);
  }

  @del('/mascotas/{id}/consultaveterinarias', {
    responses: {
      '200': {
        description: 'Mascota.Consultaveterinaria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Consultaveterinaria)) where?: Where<Consultaveterinaria>,
  ): Promise<Count> {
    return this.mascotaRepository.consultaveterinarias(id).delete(where);
  }
}
