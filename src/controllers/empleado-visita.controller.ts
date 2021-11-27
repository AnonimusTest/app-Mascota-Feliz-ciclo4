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
  Empleado,
  Visita,
} from '../models';
import {EmpleadoRepository} from '../repositories';

export class EmpleadoVisitaController {
  constructor(
    @repository(EmpleadoRepository) protected empleadoRepository: EmpleadoRepository,
  ) { }

  @get('/empleados/{id}/visitas', {
    responses: {
      '200': {
        description: 'Array of Empleado has many Visita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visita>,
  ): Promise<Visita[]> {
    return this.empleadoRepository.visitas(id).find(filter);
  }

  @post('/empleados/{id}/visitas', {
    responses: {
      '200': {
        description: 'Empleado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Empleado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {
            title: 'NewVisitaInEmpleado',
            exclude: ['id'],
            optional: ['empleadoId']
          }),
        },
      },
    }) visita: Omit<Visita, 'id'>,
  ): Promise<Visita> {
    return this.empleadoRepository.visitas(id).create(visita);
  }

  @patch('/empleados/{id}/visitas', {
    responses: {
      '200': {
        description: 'Empleado.Visita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visita, {partial: true}),
        },
      },
    })
    visita: Partial<Visita>,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.empleadoRepository.visitas(id).patch(visita, where);
  }

  @del('/empleados/{id}/visitas', {
    responses: {
      '200': {
        description: 'Empleado.Visita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visita)) where?: Where<Visita>,
  ): Promise<Count> {
    return this.empleadoRepository.visitas(id).delete(where);
  }
}
