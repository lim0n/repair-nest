import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Agreement } from './entities/agreement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgreementsService {
  
  constructor(
      @InjectRepository(Agreement)
      private agreementRepository: Repository<Agreement>
  ) {}

  async create(createAgreementDto: CreateAgreementDto) {
    const role = await this.agreementRepository.create(createAgreementDto);
    return await this.agreementRepository.save(role);
  }

  async getAgreementByName(name: string) {
    return await this.agreementRepository.findOneBy({name});
  }

  async findOne(id: number): Promise<Agreement> {
    const agreement = await this.agreementRepository.findOne({ 
      where: { id }      
    });
    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${id} not found`);
    }
    return agreement;
  }

  async findAll() {
    const agreements = this.agreementRepository.find();
    if (!agreements) {
      throw new NotFoundException(`There is no agreements at all`);
    }
    return agreements;
  }

  async update(name: string, updateRoleDto: UpdateAgreementDto) {
    return await this.agreementRepository.update({name}, updateRoleDto);
  }

  async hardRemove(id: number): Promise<void> {
    const result = await this.agreementRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agreement with ID ${id} not found`);
    }
  }
}
