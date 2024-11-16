import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatBotService } from './chat.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@ApiBearerAuth()
@ApiTags('ChatBot')
@Controller('chatbot')
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}


  // Obtener todos los usuarios
  @UseGuards(JwtAuthGuard)
  @Get('/chat-bot/:message')
  @ApiOperation({ summary: 'Devuelve una conversacion con chat-bot red neuronal' })
  @ApiParam({
    name: 'message',
    description: 'Código único message.',
  })
  async chatBot(@Param('message') message: string) {
    return this.chatBotService.chatBot(message);
  }



}

