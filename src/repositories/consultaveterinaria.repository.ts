import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consultaveterinaria, ConsultaveterinariaRelations, Proveedor, Mascota} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {MascotaRepository} from './mascota.repository';

export class ConsultaveterinariaRepository extends DefaultCrudRepository<
  Consultaveterinaria,
  typeof Consultaveterinaria.prototype.id,
  ConsultaveterinariaRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Consultaveterinaria.prototype.id>;

  public readonly mascota: BelongsToAccessor<Mascota, typeof Consultaveterinaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Consultaveterinaria, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
