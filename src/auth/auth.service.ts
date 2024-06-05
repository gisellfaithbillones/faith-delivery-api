import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async login(authDto: AuthDto): Promise<{ token: string }> {
        const user: User | null = await this.userRepository.findOne({
            where: { email: authDto.email },
        });

        if (!user) {
            throw new BadRequestException('Invalid username or password');
        }

        const isValid: boolean = await bcrypt.compare(
            authDto.password,
            user.password,
        );

        if (!isValid) {
            throw new BadRequestException('Invalid username or password');
        }

        const payload = {
            email: user.email,
            sub: user.id,
        };

        return {
            token: this.jwtService.sign(payload),
        };
    }

    logout() {
        return 'This action adds a new auth';
    }
}
