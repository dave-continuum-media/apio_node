#Project Description 

Apio helps in monitoring of Applications. You can easily integrate(see setup below) it with your application and instantly start tracking errors and performance metrics.


##Setup

1. Create an account on [Apio signup](https://apio.in/signup)

2. Register an application on [Apio onboarding](https://apio.in/onboarding)

3. Install Apio-node using npm

`npm install apio_node --save`

4. Import apio module `const apio = require('apio_node')` in your `app.js`

5. Add apio request middleware as the first middleware in your `app.js`
`app.use(apio.process_request)` . This middleware tracks every request.

6. Add apio exception middleware in the last middleware of `app.js`
`app.use(apio.process_exception)`. This middleware tracks every exception.

7. Add `application_key` received after you onboarded your application on step 2 in your `config.js` file of `apio_node` module

8. Thats it :) Now on any error you will receive an email on the registered email id and also you can see all the details of your application on the dashboard of [Apio](https://apio.in) 


##Disclaimer
The Apio service is currently in beta testing phase. We don't take any responsbility of continued service or issues that may arise. 

##Contact (any queries)

Email: apio.monitor@gmail.com