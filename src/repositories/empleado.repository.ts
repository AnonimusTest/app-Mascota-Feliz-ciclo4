import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Empleado, EmpleadoRelations, Mascota, Visita} from '../models';
import {MascotaRepository} from './mascota.repository';
import {VisitaRepository} from './visita.repository';

export class EmpleadoRepository extends DefaultCrudRepository<
  Empleado,
  typeof Empleado.prototype.id,
  EmpleadoRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Empleado.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visita, typeof Empleado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>,
  ) {
    super(Empleado, dataSource);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitaRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
