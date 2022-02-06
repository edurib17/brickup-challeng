import Realm from 'realm';

// Declare Schema
class TaskSchema extends Realm.Object {}
TaskSchema.schema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: {type: 'string'},
    title: 'string',
    description: 'string',
    image: 'string',
    datetime: 'date'
  },
};


let realm = new Realm ({schema: [TaskSchema], schemaVersion: 2});

export default realm;
