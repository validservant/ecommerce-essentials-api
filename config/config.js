
import {env} from "../src/config/env.ts";

export default{
                   "development": {
                      "username": env.DB_USER,
                      "password": env.DB_PWD,
                      "database": env.DB_NAME,
                      "host": env.DB_HOST,
                      "dialect": env.DB_DIALCT
                    },
                    "test": {
                      "username": env.DB_USER,
                      "password": env.DB_PWD,
                      "database": env.DB_NAME,
                      "host": env.DB_HOST,
                      "dialect": env.DB_DIALCT
                    },
                    "production":{
                    "username": env.DB_USER,
                      "password": env.DB_PWD,
                      "database": env.DB_NAME,
                      "host": env.DB_HOST,
                      "dialect": env.DB_DIALCT
                    },
                  }
