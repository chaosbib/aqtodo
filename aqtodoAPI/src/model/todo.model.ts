import { Table, Column, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({ tableName: `todo-${process.env.NODE_ENV || 'test'}`})
export class Todo extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  dueBy: string;
}