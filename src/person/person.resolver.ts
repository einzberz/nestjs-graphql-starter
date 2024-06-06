import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Person } from './models/person.model';
import { InputPerson, UpdatePerson } from './dto/person.input';
import * as fs from 'fs';

@Resolver(() => Person)
export class PersonResolver {
  private filePath: string = 'data/MOCKDATA.json';

  private readPersons(): Person[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error('Error reading file:', err);
      return [];
    }
  }

  private writePersons(persons: Person[]): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(persons, null, 2));
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }

  @Query(() => Person)
  getPerson(@Args('id', { type: () => ID }) id: string): Person {
    const persons = this.readPersons();
    return persons.find((person) => person.id === id);
  }

  @Query(() => [Person])
  getAllPersons(): Person[] {
    return this.readPersons();
  }

  @Mutation(() => Person)
  createPerson(@Args('input') input: InputPerson): Person {
    const persons = this.readPersons();
    const newPerson: Person = { id: Date.now().toString(), ...input };
    persons.push(newPerson);
    this.writePersons(persons);
    return newPerson;
  }

  @Mutation(() => Person)
  updatePerson(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePerson,
  ): Person {
    const persons = this.readPersons();
    const index = persons.findIndex((person) => person.id === id);
    if (index >= 0) {
      persons[index] = { ...persons[index], ...input };
      this.writePersons(persons);
      return persons[index];
    }
    return null;
  }

  @Mutation(() => Person)
  deletePerson(@Args('id', { type: () => ID }) id: string): Person {
    const persons = this.readPersons();
    const index = persons.findIndex((person) => person.id === id);
    if (index >= 0) {
      const person = persons[index];
      persons.splice(index, 1);
      this.writePersons(persons);
      return person;
    }
    return null;
  }
}
