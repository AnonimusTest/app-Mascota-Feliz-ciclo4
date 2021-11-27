import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Consultaveterinaria} from '../models';
import {ConsultaveterinariaRepository} from '../repositories';

export class ConsultaveterinariaController {
  constructor(
    @repository(ConsultaveterinariaRepository)
    public consultaveterinariaRepository : ConsultaveterinariaRepository,
  ) {}

  @post('/consultaveterinarias')
  @response(200, {
    description: 'Consultaveterinaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consultaveterinaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {
            title: 'NewConsultaveterinaria',
            exclude: ['id'],
          }),
        },
      },
    })
    consultaveterinaria: Omit<Consultaveterinaria, 'id'>,
  ): Promise<Consultaveterinaria> {
    return this.consultaveterinariaRepository.create(consultaveterinaria);
  }

  @get('/consultaveterinarias/count')
  @response(200, {
    description: 'Consultaveterinaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consultaveterinaria) where?: Where<Consultaveterinaria>,
  ): Promise<Count> {
    return this.consultaveterinariaRepository.count(where);
  }

  @get('/consultaveterinarias')
  @response(200, {
    description: 'Array of Consultaveterinaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consultaveterinaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consultaveterinaria) filter?: Filter<Consultaveterinaria>,
  ): Promise<Consultaveterinaria[]> {
    return this.consultaveterinariaRepository.find(filter);
  }

  @patch('/consultaveterinarias')
  @response(200, {
    description: 'Consultaveterinaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {partial: true}),
        },
      },
    })
    consultaveterinaria: Consultaveterinaria,
    @param.where(Consultaveterinaria) where?: Where<Consultaveterinaria>,
  ): Promise<Count> {
    return this.consultaveterinariaRepository.updateAll(consultaveterinaria, where);
  }

  @get('/consultaveterinarias/{id}')
  @response(200, {
    description: 'Consultaveterinaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consultaveterinaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Consultaveterinaria, {exclude: 'where'}) filter?: FilterExcludingWhere<Consultaveterinaria>
  ): Promise<Consultaveterinaria> {
    return this.consultaveterinariaRepository.findById(id, filter);
  }

  @patch('/consultaveterinarias/{id}')
  @response(204, {
    description: 'Consultaveterinaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consultaveterinaria, {partial: true}),
        },
      },
    })
    consultaveterinaria: Consultaveterinaria,
  ): Promise<void> {
    await this.consultaveterinariaRepository.updateById(id, consultaveterinaria);
  }

  @put('/consultaveterinarias/{id}')
  @response(204, {
    description: 'Consultaveterinaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consultaveterinaria: Consultaveterinaria,
  ): Promise<void> {
    await this.consultaveterinariaRepository.replaceById(id, consultaveterinaria);
  }

  @del('/consultaveterinarias/{id}')
  @response(204, {
    description: 'Consultaveterinaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consultaveterinariaRepository.deleteById(id);
  }
}
