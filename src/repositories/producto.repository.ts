import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Producto, ProductoRelations, Detallespedido, Proveedor} from '../models';
import {DetallespedidoRepository} from './detallespedido.repository';
import {ProveedorRepository} from './proveedor.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detallespedidos: HasManyRepositoryFactory<Detallespedido, typeof Producto.prototype.id>;

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DetallespedidoRepository') protected detallespedidoRepositoryGetter: Getter<DetallespedidoRepository>, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Producto, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
    this.detallespedidos = this.createHasManyRepositoryFactoryFor('detallespedidos', detallespedidoRepositoryGetter,);
    this.registerInclusionResolver('detallespedidos', this.detallespedidos.inclusionResolver);
  }
}
