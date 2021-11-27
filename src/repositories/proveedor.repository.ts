import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedor, ProveedorRelations, Producto, Consultaveterinaria} from '../models';
import {ProductoRepository} from './producto.repository';
import {ConsultaveterinariaRepository} from './consultaveterinaria.repository';

export class ProveedorRepository extends DefaultCrudRepository<
  Proveedor,
  typeof Proveedor.prototype.id,
  ProveedorRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Proveedor.prototype.id>;

  public readonly consultaveterinarias: HasManyRepositoryFactory<Consultaveterinaria, typeof Proveedor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('ConsultaveterinariaRepository') protected consultaveterinariaRepositoryGetter: Getter<ConsultaveterinariaRepository>,
  ) {
    super(Proveedor, dataSource);
    this.consultaveterinarias = this.createHasManyRepositoryFactoryFor('consultaveterinarias', consultaveterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaveterinarias', this.consultaveterinarias.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
