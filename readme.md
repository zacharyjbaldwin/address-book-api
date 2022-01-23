# Address Book API
**This project is a work-in-progress.**

Using Express and a MongoDB database, this API allows you to create, view, update, and delete entires in an address book.

It even allows for using API keys for security.

Sample output from `GET /api/people?apikey=abc123` where my custom API key is `abc123`:

![sample output](img/sample-output-1.JPG)

Of course, this aligns with the entries stored in the MongoDB database:

![mongo database entries](https://raw.githubusercontent.com/zacharyjbaldwin/address-book-api/master/img/mongo-database-people.JPG)

More to come in the future.

## License
MIT