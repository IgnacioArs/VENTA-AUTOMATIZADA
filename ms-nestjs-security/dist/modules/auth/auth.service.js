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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async createAuth(CreateAuthDto) {
        const { name, email, password } = CreateAuthDto;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const nuevoUsuario = {
            name: name,
            email: email,
            password: hash
        };
        const usuarioRegistrado = await this.usersRepository.save(nuevoUsuario);
        console.log(usuarioRegistrado);
        return usuarioRegistrado;
    }
    async authLogin(LoginAuthDto) {
        const { email, password } = LoginAuthDto;
        const userFind = await this.usersRepository.findOne({ where: { email } });
        if (!userFind) {
            throw new common_1.HttpException('NOT_FOUND', common_1.HttpStatus.NOT_FOUND, {
                cause: new Error('Email usuario encontrado'),
            });
        }
        const passwordValidada = await bcrypt.compare(password, userFind.password);
        if (!passwordValidada) {
            throw new common_1.HttpException('FORBIDDEN', common_1.HttpStatus.FORBIDDEN, {
                cause: new Error('Password usuario no encontrada'),
            });
        }
        const payload = {
            id: userFind.id,
            name: userFind.name,
        };
        const token = this.jwtService.sign(payload);
        const userResponse = {
            user: userFind,
            token: token,
        };
        return userResponse;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map