git stash          # guarda los cambios
git stash list     # muestra los stashes guardados
git stash apply    # aplica el último stash sin borrarlo
git stash pop      # aplica el último stash y lo borra de la lista


npx prisma migrate dev --name model_Auto

''''''''''''''''''''''''''''''''''

import { Module } from '@nestjs/common';
import { AutoService } from './services/auto.service';
import { AutoController } from './controllers/auto.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [AutoController],
  providers: [AutoService, PrismaService],
})
export class AutoModule {}

//////////////////////////////////////////////


```
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateAutoDto } from '../dto/create-auto.dto';

import { Injectable } from '@nestjs/common';

  

@Injectable()

export class AutoService {

constructor(private readonly prisma: PrismaService) {}

async createAuto(dto: CreateAutoDto, userId: number) {

return this.prisma.auto.create({

data: {

...dto,

userId,

},

});

}

}
```


```
import { Controller } from "@nestjs/common";

import { AutoService } from "../services/auto.service";

  

@Controller('auto')

export class AutoController {

constructor(private readonly autoService: AutoService) {}

}
```