import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detallespedido,
  Pedido,
} from '../models';
import {DetallespedidoRepository} from '../repositories';

export class DetallespedidoPedidoController {
  constructor(
    @repository(DetallespedidoRepository)
    public detallespedidoRepository: DetallespedidoRepository,
  ) { }

  @get('/detallespedidos/{id}/pedido', {
    responses: {
      '200': {
        description: 'Pedido belonging to Detallespedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pedido)},
          },
        },
      },
    },
  })
  async getPedido(
    @param.path.string('id') id: typeof Detallespedido.prototype.id,
  ): Promise<Pedido> {
    return this.detallespedidoRepository.pedido(id);
  }
}
