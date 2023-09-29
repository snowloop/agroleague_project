
# Agroleague Project - Alexandre Josse


# Back-end
technologies : yarn, express, jest, typescript
## /forum router

##### POST /forum/subject
creates a new subject

*body :* 
`{subject :string;
content: string;
authorId: string;
}
`

##### GET /forum/subjects?authorId=
*params :*
`authorId? : string`

*response body :*
`[... subjects]
`

#### GET /forum/answers/:subjectId

*response body :*
`[... answers]
`

##### POST /forum/answers

Creates a new message, linked to a previous message

*body :*
`{
    parentId : string;
    content: string;
    authorId?: string;
}`


## /users router
POST /users

*body :*
`{name :string;
lastName : string;}`

*body :*
`{userId : string;}`



# Mobile App
technologies : yarn, react native, expo cli, typescript, markown


