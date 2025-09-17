import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    register(dto: RegisterDto): Promise<{
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
