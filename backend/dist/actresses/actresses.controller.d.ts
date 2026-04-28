import { Actress } from './entities/actress.entity';
import { ActressesService } from './actresses.service';
import { CreateActressDto } from './dto/create-actress.dto';
export declare class ActressesController {
    private readonly actressesService;
    constructor(actressesService: ActressesService);
    findAll(): Promise<Actress[]>;
    findOne(id: string): Promise<Actress | null>;
    create(dto: CreateActressDto): Promise<Actress>;
}
