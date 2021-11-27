import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pagosplanes, PagosplanesRelations, Mascota, Plan, Visita} from '../models';
import {MascotaRepository} from './mascota.repository';
import {PlanRepository} from './plan.repository';
import {VisitaRepository} from './visita.repository';

export class PagosplanesRepository extends DefaultCrudRepository<
  Pagosplanes,
  typeof Pagosplanes.prototype.id,
  PagosplanesRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof Pagosplanes.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof Pagosplanes.prototype.id>;

  public readonly visitas: HasManyRepositoryFactory<Visita, typeof Pagosplanes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>,
  ) {
    super(Pagosplanes, dataSource);
    this.visitas = this.createHasManyRepositoryFactoryFor('visitas', visitaRepositoryGetter,);
    this.registerInclusionResolver('visitas', this.visitas.inclusionResolver);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}
