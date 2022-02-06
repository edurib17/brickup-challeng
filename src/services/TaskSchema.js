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
  },
};


let realm = new Realm ({schema: [TaskSchema], schemaVersion: 1});

export default realm;
