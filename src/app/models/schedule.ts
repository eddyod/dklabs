import { Location } from './location';
import { Person } from './person';

export interface Schedule {
  id: number;
  start: Date;
  end: Date;
  title: string;
  personId: number;
  locationId: number;
  location: Location;
  person: Person;
  payRate: number;
  created: Date;
  completed: boolean;
  distance: number;
  displayArrived: boolean;

}
