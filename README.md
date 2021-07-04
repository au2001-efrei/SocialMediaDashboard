*Note: the keys/passwords contained in this repo have all been revoked. No need to try.*

# Installing

`cd path/to/code`

`npm install`

Open `config.js`, replace lines 6 to 9 with your database credentials.

*No need to install the tables by hand. The website creates them for you on the first startup.*

`npm start`

Visit [http://localhost:3000](http://localhost:3000).

# Usage

Go to the [login page](http://localhost:3000/login).

Create an account.

Go to the [profile page](http://localhost:3000/profile).

Click on any of the 4 options (Youtube, Twitter, Instagram, Reddit). Follow the website-specific instructions to link your account.

You may not be able to link your account on some services. In this case, send us your username so that we add you as a tester of our app. Otherwise, you can replace the concerned app tokens in the `config.js` file (you will need a developer account on that service!).

Repeat the previous step as many times as you wish.

Delete an account by clicking on its ID on the [profile page](http://localhost:3000/profile).

Update an account's access and refresh tokens by logging in to it again.

To see stats about your accounts, go to the [dashboard page](http://localhost:3000/dashboard).

If you revoke access to the app in your website's settings, the account is removed from the database as soon as you visit the Dashboard again.
