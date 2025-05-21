import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DataEntitiesService } from '../services/data-entities.service';
import type { CreateSettingDTO } from '../dto/create-setting.DTO';
import type { UpdateSettingDTO } from '../dto/update-setting.DTO';
import type { CreateVeterinarianDTO } from '../dto/create-veterinarian.DTO';
import type { UpdateVeterinarianDTO } from '../dto/update-veterinarian.DTO';
import type { FindVeterinarianDTO } from '../dto/find-veterinarian.DTO';

@Controller('data-entities')
export class DataEntitiesController {
  constructor(private dataService: DataEntitiesService) {}

  // ==================== MÉTODOS GET ====================
  @Get('specie')
  async getSpecies() {
    return await this.dataService.getSpecies();
  }

  @Get('neighborhood')
  async getNeighborhoods() {
    return await this.dataService.getNeighborhoods();
  }

  @Get('reason')
  async getReasons() {
    return await this.dataService.getReasons();
  }

  @Get('user')
  async getUsers(@Query() querys: { email?: string }) {
    if (querys.email)
      return await this.dataService.getUserByEmail(querys.email);
    else return await this.dataService.getUsers();
  }

  @Get('setting')
  async getSettings(@Query() querys: { settingName?: string }) {
    return await this.dataService.getSetting(querys);
  }

  @Get('veterinarian')
  async getVeterinarians(@Query() querys: FindVeterinarianDTO) {
    return await this.dataService.getVeterinarians(querys);
  }

  // ==================== MÉTODOS POST ====================
  @Post('specie')
  async createSpecie(@Body() body: { specie: string }) {
    console.log(body);
    return await this.dataService.createSpecie(body);
  }

  @Post('neighborhood')
  async createNeighborhood(@Body() body: { neighborhood: string }) {
    console.log(body);
    return await this.dataService.createNeighborhood(body);
  }

  @Post('neighborhood/bulk')
  async createNeighborhoodsBulk(@Body() body: { neighborhood: string }[]) {
    console.log(body);
    return await this.dataService.createNeighborhoodsBulk(body);
  }

  @Post('reason')
  async createReason(@Body() body: { reason: string }) {
    console.log(body);
    return await this.dataService.createReason(body);
  }

  @Post('reason/bulk')
  async createReasonsBulk(@Body() body: { reason: string }[]) {
    console.log(body);
    return await this.dataService.createReasonsBulk(body);
  }

  @Post('user')
  async createUser(@Body() body: { email: string; role: string }) {
    console.log(body);
    return await this.dataService.createUser(body);
  }

  @Post('setting')
  async createSetting(@Body() body: CreateSettingDTO) {
    console.log(body);
    return await this.dataService.createSetting(body);
  }

  @Post('veterinarian')
  async createVeterinarian(@Body() body: CreateVeterinarianDTO) {
    return await this.dataService.createVeterinarian(body);
  }

  // ==================== MÉTODOS PUT/PATCH ====================
  @Patch('neighborhood/:id')
  async editNeighborhood(
    @Body() body: { neighborhood?: string; inUse?: boolean },
    @Param('id') id: number
  ) {
    this.dataService.updateNeighborhood(body, id);
  }

  @Patch('specie/:id')
  async editSpecie(
    @Body() body: { specie?: string; inUse?: boolean },
    @Param('id') id: number
  ) {
    this.dataService.updateSpecie(body, id);
  }

  @Patch('reason/:id')
  async editReason(
    @Body()
    body: { reason?: string; inUse?: boolean; reasonSex?: 'a' | 'm' | 'h' },
    @Param('id') id: number
  ) {
    this.dataService.updateReason(body, id);
  }

  @Patch('setting')
  async editSetting(
    @Body()
    body: UpdateSettingDTO
  ) {
    return await this.dataService.updateSetting(body);
  }

  @Patch('veterinarian/:id')
  async editVeterinarian(
    @Body() body: UpdateVeterinarianDTO,
    @Param('id') id: number
  ) {
    return await this.dataService.updateVeterinarian(body, id);
  }

  @Put('user/:id')
  async editUser(
    @Body() body: { email: string; role: string },
    @Param('id') id: number
  ) {
    console.log(body);
    return await this.dataService.editUser(body, id);
  }
}
