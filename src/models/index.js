// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Home, Post, Comment, Profile } = initSchema(schema);

export {
  Home,
  Post,
  Comment,
  Profile
};