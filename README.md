# lambda-datafile-manager
uses lambda to store a datafile in S3

1. Setup API gateway endpoint, and configure as webhook for Optimizely
2. Connect your API gateway endpoint to Lambda
3. Clone this repo and run update with your own api key and `npm install`
4. run `gulp` to create a lambda friendly zip file
5. Upload the build zip to lambda and you're done!
