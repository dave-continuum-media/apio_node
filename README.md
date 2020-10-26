#Project Description 

Apio helps in monitoring of Applications. You can easily integrate(see setup below) it with your application and instantly start tracking errors and performance metrics.


##Setup

1. Installation instructions: https://youtu.be/XDl2_e6nlKo

2. Create an account on [Apio signup](https://apio.in/signup)

3. Register an application on [Apio onboarding](https://apio.in/onboarding)

4. Install Apio-node using npm

`npm install apio_node --save`

5. Import apio module `const apio = require('apio_node')` in your `app.js`

6. Add apio request middleware as the first middleware in your `app.js` using following command `app.use(apio.process_request)` . This middleware tracks every request.

7. Add apio exception middleware in the last middleware of `app.js` using following command `app.use(apio.process_exception)`. This middleware tracks every exception.

8. Add `application_key` received after you onboarded your application on step 2 in your `config.js` file of `apio_node` module

9. Make sure you pass the `err` to `apio.process_exception` middleware, this means while calling `next()`in your error handler , pass the error object like `next(err)`

Thats it :) Now on any error you will receive an email on the registered email id and also you can see all the details of your application on the dashboard of [Apio](https://apio.in) 


##Disclaimer
The Apio service is currently in beta testing phase. We don't take any responsbility of continued service or issues that may arise. 

##Contact (any queries)

Email: apio.monitor@gmail.com