# GraphQL Test

This is a test markdown file for GraphQL.

## Introduction

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data.

## Example Query

```graphql
{
    user(id: "1") {
        name
        email
    }
}
```

## Example Response

```json
{
    "data": {
        "user": {
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
    }
}
```

## Resources

- [GraphQL Official Website](https://graphql.org/)
- [GraphQL GitHub Repository](https://github.com/graphql/graphql-js)