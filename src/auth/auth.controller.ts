import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    UseGuards,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post('login')
    async login(@Body() authDto: AuthDto) {
        return await this.authService.login(authDto);
    }

    @Post('logout')
    logout() {
        return this.authService.logout();
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    getAuthUser(@Request() request: { user: User }) {
        return request.user;
    }
}
