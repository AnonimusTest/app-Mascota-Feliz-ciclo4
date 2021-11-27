import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visita, VisitaRelations, Pagosplanes, Empleado} from '../models';
import {PagosplanesRepository} from './pagosplanes.repository';
import {EmpleadoRepository} from './empleado.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.id,
  VisitaRelations
> {

  public readonly pagosplanes: BelongsToAccessor<Pagosplanes, typeof Visita.prototype.id>;

  public readonly empleado: BelongsToAccessor<Empleado, typeof Visita.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PagosplanesRepository') protected pagosplanesRepositoryGetter: Getter<PagosplanesRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Visita, dataSource);
    this.empleado = this.createBelongsToAccessorFor('empleado', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleado', this.empleado.inclusionResolver);
    this.pagosplanes = this.createBelongsToAccessorFor('pagosplanes', pagosplanesRepositoryGetter,);
    this.registerInclusionResolver('pagosplanes', this.pagosplanes.inclusionResolver);
  }
}
