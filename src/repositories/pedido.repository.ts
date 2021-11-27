import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Cliente, Detallespedido} from '../models';
import {ClienteRepository} from './cliente.repository';
import {DetallespedidoRepository} from './detallespedido.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Pedido.prototype.id>;

  public readonly detallespedidos: HasManyRepositoryFactory<Detallespedido, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('DetallespedidoRepository') protected detallespedidoRepositoryGetter: Getter<DetallespedidoRepository>,
  ) {
    super(Pedido, dataSource);
    this.detallespedidos = this.createHasManyRepositoryFactoryFor('detallespedidos', detallespedidoRepositoryGetter,);
    this.registerInclusionResolver('detallespedidos', this.detallespedidos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
