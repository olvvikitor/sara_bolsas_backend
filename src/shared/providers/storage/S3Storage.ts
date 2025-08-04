import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { generateFileName, getMimeType} from 'src/shared/multer/renameFile';
import IStorageProvider  from './IStorageProvider';
import { memoryStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3StorageProvider implements MulterOptionsFactory, IStorageProvider {

  private s3: S3;
  private bucket:string;

  constructor(private configService:ConfigService) {

    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION')
    })

    this.bucket = this.configService.get<string>('AWS_BUCKET_S3')
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: memoryStorage()
    };
  }
  
  async upload(file: Express.Multer.File): Promise<string> {

    const filenameModifield = generateFileName(file.originalname);
    const contentType = getMimeType(file.originalname);

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: filenameModifield,
      Body: file.buffer,
      ContentType: contentType,
      ACL: 'public-read',
    });

    await this.s3.send(command);

    return `https://${this.bucket}.s3.us-east-1.amazonaws.com/${filenameModifield}`;
  }

  async get(key: any): Promise<any> {
    return `https://pratica-multer-s3.s3.us-east-1.amazonaws.com/${key}`
  }
  async delete(url: string | undefined): Promise<void> {
    if(url){
    const filename = url.split('.com/')[1]
    await this.s3.deleteObject({
      Bucket: this.bucket,
      Key: filename
    })
  }
  else{
    return
  }
}
}