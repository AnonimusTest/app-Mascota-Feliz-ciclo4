import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Plan, PlanRelations, Pagosplanes} from '../models';
import {PagosplanesRepository} from './pagosplanes.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly pagosplanes: HasManyRepositoryFactory<Pagosplanes, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagosplanesRepository') protected pagosplanesRepositoryGetter: Getter<PagosplanesRepository>,
  ) {
    super(Plan, dataSource);
    this.pagosplanes = this.createHasManyRepositoryFactoryFor('pagosplanes', pagosplanesRepositoryGetter,);
    this.registerInclusionResolver('pagosplanes', this.pagosplanes.inclusionResolver);
  }
}
