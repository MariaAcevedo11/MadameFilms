import { Repository } from 'typeorm';
import { CreateActressDto } from './dto/create-actress.dto';
import { Actress } from './entities/actress.entity';
export declare class ActressesService {
    private actressesRepository;
    constructor(actressesRepository: Repository<Actress>);
    findAll(): Promise<Actress[]>;
    findOne(id: number): Promise<Actress | null>;
    create(dto: CreateActressDto): Promise<Actress>;
}
