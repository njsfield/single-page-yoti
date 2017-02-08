# Single Page Yoti Response App


## Setup

First install the depencies of the project;

```
npm install
```

To run this project, first set up a [YOTI application](https://www.yoti.com/dashboard/login) that requires the user provide their *Photo* and *Given Name(s)*

Defined your callback URL in the YOTI dashboard as;

```
https://localhost:4000/profile
```

Create a config.env file and add your YOTI SDK ID (available in the Yoti dashboard);
```
export YOTI_SDK_ID = {insert yoti sdk id}
```
Get your YOTI scenario ID by using a service like [postman](https://www.google.co.uk/webhp?sourceid=chrome-instant&rlz=1C5CHFA_enGB626GB626&ion=1&espv=2&ie=UTF-8#q=postman) to make a GET request to;
```
https://yoti.com/dashboard/api/v1/applications/{{insert application ID}}/public
```
Check the response header to find your Scenario ID, then update your config.env file to include it
```
export YOTI_SDK_ID = {insert yoti sdk id}
export SCENARIO_ID = {insert scenario id}
```
Create a directory called **keys** in the route of this project, include your application **.pem** file available from the YOTI dashboard.
Finally, follow [these steps](http://stackoverflow.com/questions/12871565/how-to-create-pem-files-for-https-web-server) to generate a
**server-cert.pem** file and a **server-key.pem** file (for serving over SSL), and place them in the **keys** directory too, which should now look like this...

```
keys/
  app.pem
  server-cert.pem
  server-key.pem
```

## Running

To run locally, start the server;
```
npm run start
```

Then visit https://localhost:4000
