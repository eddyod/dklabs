import { Location } from './location';


export class Person {

  public id: number;
  public name: string;
  public phone: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public address: string;
  public password: string;
  public active: boolean;
  public created: Date;
  public rooms: Location[];
  public token: string;
  public picture: string;


  constructor() {}
}
