import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Consultaveterinaria, Pagosplanes, Empleado} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaveterinariaRepository} from './consultaveterinaria.repository';
import {PagosplanesRepository} from './pagosplanes.repository';
import {EmpleadoRepository} from './empleado.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.id>;

  public readonly consultaveterinarias: HasManyRepositoryFactory<Consultaveterinaria, typeof Mascota.prototype.id>;

  public readonly pagosplanes: HasManyRepositoryFactory<Pagosplanes, typeof Mascota.prototype.id>;

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof Mascota.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaveterinariaRepository') protected consultaveterinariaRepositoryGetter: Getter<ConsultaveterinariaRepository>, @repository.getter('PagosplanesRepository') protected pagosplanesRepositoryGetter: Getter<PagosplanesRepository>, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(Mascota, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
    this.pagosplanes = this.createHasManyRepositoryFactoryFor('pagosplanes', pagosplanesRepositoryGetter,);
    this.registerInclusionResolver('pagosplanes', this.pagosplanes.inclusionResolver);
    this.consultaveterinarias = this.createHasManyRepositoryFactoryFor('consultaveterinarias', consultaveterinariaRepositoryGetter,);
    this.registerInclusionResolver('consultaveterinarias', this.consultaveterinarias.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
