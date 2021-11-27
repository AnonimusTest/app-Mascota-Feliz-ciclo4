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
  Producto,
} from '../models';
import {DetallespedidoRepository} from '../repositories';

export class DetallespedidoProductoController {
  constructor(
    @repository(DetallespedidoRepository)
    public detallespedidoRepository: DetallespedidoRepository,
  ) { }

  @get('/detallespedidos/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Detallespedido',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Detallespedido.prototype.id,
  ): Promise<Producto> {
    return this.detallespedidoRepository.producto(id);
  }
}
