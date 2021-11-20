const tickets = [
        {
            "id": 1,
            "title": "Ticket1",
            "description": "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a door a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "notes": "Grrr...",
            "deadline": "20/11/2021",
            "etat": "done",
            "user_id": 3,
            "createdBy": 2,
            "created_at": "2021-11-13T23:35:05.000000Z",
            "updated_at": "2021-11-13T23:39:45.000000Z",
            "agent": {
                "id": 3,
                "name": "Mourad",
                "lastname": "Mustapha",
                "type": "agent",
                "email": "fouzioukacha1998@gmail.com",
                "email_verified_at": null,
                "created_at": "2021-11-13T23:33:19.000000Z",
                "updated_at": "2021-11-13T23:33:19.000000Z"
            },
            "customer": {
                "id": 2,
                "name": "Abdelhak",
                "lastname": "Kherroubi",
                "type": "customer",
                "email": "ha9kou@gmail.com",
                "email_verified_at": null,
                "created_at": "2021-11-13T23:33:06.000000Z",
                "updated_at": "2021-11-13T23:33:06.000000Z"
            }
        },
        {
            "id": 2,
            "title": "Ticket2",
            "description": "Lorem ipsut relying on meaningful content. Lorem ipsum may be used as a er before final copy is available.",
            "notes": "Second ticket is easy, don't be late",
            "deadline": "05/12/2021",
            "etat": "todo",
            "user_id": null,
            "createdBy": 2,
            "created_at": "2021-11-13T23:35:34.000000Z",
            "updated_at": "2021-11-13T23:35:34.000000Z",
            "agent": null,
            "customer": {
                "id": 2,
                "name": "Abdelhak",
                "lastname": "Kherroubi",
                "type": "customer",
                "email": "ha9kou@gmail.com",
                "email_verified_at": null,
                "created_at": "2021-11-13T23:33:06.000000Z",
                "updated_at": "2021-11-13T23:33:06.000000Z"
            }
        },
        {
            "id": 3,
            "title": "Ticketngrok",
            "description": "ngrok db",
            "notes": "deployed db in ngrok",
            "deadline": "28/12/2021",
            "etat": "todo",
            "user_id": null,
            "createdBy": 2,
            "created_at": "2021-11-14T05:39:44.000000Z",
            "updated_at": "2021-11-14T05:39:44.000000Z",
            "agent": null,
            "customer": {
                "id": 2,
                "name": "Abdelhak",
                "lastname": "Kherroubi",
                "type": "customer",
                "email": "ha9kou@gmail.com",
                "email_verified_at": null,
                "created_at": "2021-11-13T23:33:06.000000Z",
                "updated_at": "2021-11-13T23:33:06.000000Z"
            }
        }
    ]

export const tickets$ = new Promise((resolve, reject) => setTimeout(resolve, 100, tickets))