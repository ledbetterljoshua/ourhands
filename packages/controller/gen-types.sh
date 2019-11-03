#! /bin/bash
apollo-codegen introspect-schema http://localhost:4000/graphql --output schema.json
apollo-codegen generate src/**/*.tsx --schema schema.json --target ts-modern