import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Person } from './models/person.model';
import { InputPerson, UpdatePerson } from './dto/person.input';

@Resolver(of => Person)
export class PersonResolver {
    private persons: Person[] = [
        { id: '1', username: 'johndoe', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', gender: 'Male', birthDay: '1990-01-01' },
        { id: '2', username: 'janedoe', firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', gender: 'Female', birthDay: '1992-02-02' },
        { id: '3', username: 'bobjones', firstName: 'Bob', lastName: 'Jones', email: 'bob.jones@example.com', gender: 'Male', birthDay: '1985-03-03' }
    ];

    @Query(returns => Person)
    getPerson(@Args('id', { type: () => ID }) id: string): Person {
        return this.persons.find(person => person.id === id);
    }

    @Mutation(returns => Person)
    createPerson(@Args('input') input: InputPerson): Person {
        const newPerson: Person = { id: Date.now().toString(), ...input };
        this.persons.push(newPerson);
        return newPerson;
    }

    @Mutation(returns => Person)
    updatePerson(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdatePerson,
    ): Person {
        const personIndex = this.persons.findIndex(person => person.id === id);
        if (personIndex >= 0) {
            this.persons[personIndex] = { ...this.persons[personIndex], ...input };
            return this.persons[personIndex];
        }
        return null;
    }

    @Mutation(returns => Person)
    deletePerson(@Args('id', { type: () => ID }) id: string): Person {
        const personIndex = this.persons.findIndex(person => person.id === id);
        if (personIndex >= 0) {
            const person = this.persons[personIndex];
            this.persons.splice(personIndex, 1);
            return person;
        }
        return null;
    }
}
