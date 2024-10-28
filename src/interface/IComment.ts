import { Document, Types } from "mongoose";

export interface IComment extends Document<Types.ObjectId> {
  user_id: Types.ObjectId;
  commentContent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICommentInputDTO {
  commentContent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Logger {
  debug(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

class FakeLogger implements Logger {
  debug(message: string): void {
  }
  info(message: string): void {

  }
  warn(message: string): void {

  }
  error(message: string): void {

  }
}

class ConsoleLogger implements Logger {
  debug(message: string): void {
    console.debug(message);
  }
  info(message: string): void {
    console.info(message);
  }
  warn(message: string): void {
    console.warn(message);
  }
  error(message: string): void {
    console.error(message);
  }
}

class JsonFileLogger implements Logger {
  debug(message: string): void {

  }
  info(message: string): void {

  }
  warn(message: string): void {

  }
  error(message: string): void {

  }
}

class BetterLogger extends ConsoleLogger {

}

interface BService {
  d(): number;
}


class AService {
  logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }

  doSomething() {
    this.logger.info("good");
  }
}

// IoC => Inversion of Control
// 

const logger = process.env.NODE_ENV === "production" ? new JsonFileLogger() : new ConsoleLogger();
const nLogger = {
  debug(message: string): void {
    console.debug(message);
  },
  info(message: string): void {
    console.info(message);
  },
  warn(message: string): void {
    console.warn(message);
  },
  error(message: string): void {
    console.error(message);
  },
}
new AService(nLogger);

interface FileStorage {
  upload(blob: Uint32Array): Promise<void>;
  download(url: string): Promise<string>;
}

class FileUploadService {
  fileStorage: FileStorage;
  constructor(fileStorage) {
    this.fileStorage = fileStorage;
  }

  doSomethingAndUpload() {
    this.fileStorage.upload();
  }
}

const storageServiceMap = {
  aws: new FileUploadService(new S3()),
  gcp: new FileUploadService(new GCPStorage()),
  azure: new FileUploadService(new AzureFileStorage()),
}

app.post("/upload-image", async (req, res, next) => {
  try {
    const serviceType = req.body.serviceType;
    const file = req.file;
    const service = storageServiceMap[serviceType];
    if (service === undefined) {
      throw new Error("지원하지 않는 서비스입니다");
    }
    const result = await service.doSomethingAndUpload(file);
    res.json(result);
  } catch (error) {
    next(error);
  }
})

// 다형성, 추상화

/* */


