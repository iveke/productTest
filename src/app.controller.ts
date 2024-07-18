import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController{
    
    @Get()
    getApp(){
        return 'hello you in the site tkach'
    }
}