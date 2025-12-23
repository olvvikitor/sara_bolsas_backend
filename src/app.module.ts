import { Module } from '@nestjs/common';
import CategoriaModule from './modules/admin/categoria/categoria.module';
import { ConfigModuleAplication } from './config/config.module';
import SubcategoriaModule from './modules/admin/subcategoria/subcategoria.module';
import ProductModule from './modules/admin/produto/product.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import LoginAdminModule from './modules/admin/login/loginAdmin.module';
import { AuthModule } from './shared/providers/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    CategoriaModule, SubcategoriaModule, ProductModule, LoginAdminModule,AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
