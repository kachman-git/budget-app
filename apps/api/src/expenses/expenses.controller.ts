import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.create(userId, createExpenseDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.expensesService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.expensesService.findOne(userId, id);
  }

  @Put(':id')
  update(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(userId, id, updateExpenseDto);
  }

  @Delete(':id')
  remove(
    @GetUser('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.expensesService.remove(userId, id);
  }
}
