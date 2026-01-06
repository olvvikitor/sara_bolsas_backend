import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { memoryStorage, Multer } from 'multer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import IStorageProvider from './IStorageProvider';
import { generateFileName } from 'src/shared/multer/renameFile';

@Injectable()
export class Diskprovider implements MulterOptionsFactory, IStorageProvider {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage(),
    };
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const uploadsDir = path.resolve(process.cwd(), 'uploads');
    const filename = generateFileName(file.originalname);
    const filePath = path.join(uploadsDir, filename);

    // Cria a pasta se não existir
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Salva o arquivo no disco
    await fs.promises.writeFile(filePath, file.buffer);

    return `https://sara-bolsas-backend.onrender.com/uploads/${filename}`
  }

  async get(filename: string): Promise<string> {
    return `https://sara-bolsas-backend.onrender.com/uploads/${filename}`
  }

  async delete(url: string | undefined): Promise<void> {
    if(url){
    const filename = url.split('uploads/')[1]
    const filePath = path.resolve(process.cwd(), 'uploads', filename);

    try {
      await fs.promises.stat(filePath); // Verifica se existe
      await fs.promises.unlink(filePath); // Remove
    } catch (error) {
      console.error('Erro ao tentar excluir o arquivo:', error);
      throw new Error('Arquivo não encontrado');
    }
  }
  return
}
}