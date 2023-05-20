import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Auth} from '../models';
import {AuthRepository} from '../repositories';

export class AuthController {
  constructor(
    @repository(AuthRepository)
    public authRepository : AuthRepository,
  ) {}

  @post('/auths')
  @response(200, {
    description: 'Auth model instance',
    content: {'application/json': {schema: getModelSchemaRef(Auth)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {
            title: 'NewAuth',
            exclude: ['id'],
          }),
        },
      },
    })
    auth: Omit<Auth, 'id'>,
  ): Promise<Auth> {
    return this.authRepository.create(auth);
  }

  @get('/auths/count')
  @response(200, {
    description: 'Auth model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Auth) where?: Where<Auth>,
  ): Promise<Count> {
    return this.authRepository.count(where);
  }

  @get('/auths')
  @response(200, {
    description: 'Array of Auth model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Auth, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Auth) filter?: Filter<Auth>,
  ): Promise<Auth[]> {
    return this.authRepository.find(filter);
  }

  @patch('/auths')
  @response(200, {
    description: 'Auth PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {partial: true}),
        },
      },
    })
    auth: Auth,
    @param.where(Auth) where?: Where<Auth>,
  ): Promise<Count> {
    return this.authRepository.updateAll(auth, where);
  }

  @get('/auths/{id}')
  @response(200, {
    description: 'Auth model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Auth, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Auth, {exclude: 'where'}) filter?: FilterExcludingWhere<Auth>
  ): Promise<Auth> {
    return this.authRepository.findById(id, filter);
  }

  @patch('/auths/{id}')
  @response(204, {
    description: 'Auth PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {partial: true}),
        },
      },
    })
    auth: Auth,
  ): Promise<void> {
    await this.authRepository.updateById(id, auth);
  }

  @put('/auths/{id}')
  @response(204, {
    description: 'Auth PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() auth: Auth,
  ): Promise<void> {
    await this.authRepository.replaceById(id, auth);
  }

  @del('/auths/{id}')
  @response(204, {
    description: 'Auth DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.authRepository.deleteById(id);
  }
}
