"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(jwtService, httpservice, configService) {
        this.jwtService = jwtService;
        this.httpservice = httpservice;
        this.configService = configService;
    }
    async createAuth(createAuthDto) {
        const { name, email, password } = createAuthDto;
        const nuevoUsuario = {
            name: name,
            email: email,
            password: password,
        };
        const ms = this.configService.get('msSecurity');
        try {
            const registro = await this.httpservice.axiosRef.post(`${ms}/auth/registro`, nuevoUsuario);
            if (!registro.data) {
                throw new common_1.HttpException('CONFLICT', common_1.HttpStatus.CONFLICT, {
                    cause: new Error('Error usuario ya existe'),
                });
            }
            return registro.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response?.data?.message || 'Error al crear el usuario', error.response?.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async authLogin(LoginAuthDto) {
        const { email, password } = LoginAuthDto;
        const nuevoUsuario = {
            email: email,
            password: password,
        };
        const ms = this.configService.get('msSecurity');
        try {
            const loginUsuario = await this.httpservice.axiosRef.post(`${ms}/auth/login`, nuevoUsuario);
            const payload = {
                id: loginUsuario.data.user.id,
                name: loginUsuario.data.user.name
            };
            const token = this.jwtService.sign(payload);
            const userResponse = {
                user: loginUsuario.data.user,
                tokenSecurity: loginUsuario.data.token,
                token: token,
            };
            return userResponse;
        }
        catch (error) {
            throw new common_1.HttpException('CONFLICT', common_1.HttpStatus.CONFLICT, {
                cause: new Error('El Usuario encontrado'),
            });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        axios_1.HttpService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map