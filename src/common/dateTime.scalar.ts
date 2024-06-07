import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateTimeScalar implements CustomScalar<string, Date> {
  description = `DateTime in ISO 8601 format. \n\t 
  The format is "YYYY-MM-DDTHH:mm:ss.sssZ", \n\t 
  The letter "T" is used to separate the date and time components.  where "Z" indicates the UTC timezone. \n\t  
  Example: "2023-09-13T15:30:00.000Z".`;

  parseValue(value: string): Date {
    if (!/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z?)$/.test(value)) {
      throw new Error('Invalid DateTime format. Please use ISO 8601 format.');
    }
    return new Date(value); // value from the client
  }
  serialize(value: Date | string): string {
    if (typeof value == 'string') {
      return new Date(value).toISOString();
    }
    return value.toISOString(); // value sent to the client
  }

  parseLiteral(ast: ValueNode): Date | null {
    if (
      ast.kind === Kind.STRING &&
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z?)$/.test(ast.value)
    ) {
      return new Date(ast.value);
    }
    return null;
  }
}
